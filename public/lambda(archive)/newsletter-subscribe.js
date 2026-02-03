/**
 * Newsletter Subscription Lambda Handler
 * 
 * This function handles newsletter signups:
 * 1. Stores subscriber in DynamoDB
 * 2. Sends welcome email via SES
 * 3. Optionally publishes to SNS for additional workflows
 * 
 * CORNBEF: Update the following before deployment:
 * - DynamoDB table name
 * - SES email addresses
 * - SNS topic ARN (if using)
 * 
 * Environment Variables Required:
 * - DYNAMODB_TABLE: Name of the subscribers table
 * - SOURCE_EMAIL: Verified SES email for sending
 * - SNS_TOPIC_ARN: (Optional) SNS topic for new subscriber notifications
 * - AWS_REGION: AWS region
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns');

const dynamoClient = new DynamoDBClient({ region: process.env.AWS_REGION || 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(dynamoClient);
const sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });
const snsClient = new SNSClient({ region: process.env.AWS_REGION || 'us-east-1' });

const TABLE_NAME = process.env.DYNAMODB_TABLE || 'newsletter-subscribers';

// CORS headers
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // CORNBEF: Restrict to your domain in production
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

exports.handler = async (event) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { email } = body;

    // Validate email
    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email format' }),
      };
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already subscribed
    const getCommand = new GetCommand({
      TableName: TABLE_NAME,
      Key: { email: normalizedEmail },
    });

    const existingSubscriber = await docClient.send(getCommand);

    if (existingSubscriber.Item) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          message: 'You\'re already subscribed to our newsletter!' 
        }),
      };
    }

    // Store new subscriber
    const timestamp = new Date().toISOString();
    const putCommand = new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        email: normalizedEmail,
        subscribedAt: timestamp,
        status: 'active',
        source: 'website',
      },
    });

    await docClient.send(putCommand);

    // Send welcome email
    const welcomeEmailCommand = new SendEmailCommand({
      Source: process.env.SOURCE_EMAIL,
      Destination: {
        ToAddresses: [normalizedEmail],
      },
      Message: {
        Subject: {
          Data: 'Welcome to the PHEpoxyWorld Workshop Newsletter! 🪵',
          Charset: 'UTF-8',
        },
        Body: {
          Text: {
            Data: `
Welcome to the PHEpoxyWorld Woodcraft Newsletter!

Thank you for joining our community of wood art enthusiasts. You'll now receive:

✨ Exclusive first looks at new figurine releases
🎨 Behind-the-scenes glimpses of our workshop
🎁 Special subscriber-only discounts
📖 Stories about our craft and artisans

As a welcome gift, enjoy 10% off your first order with code: WELCOME10
(CORNBEF: Update or remove this offer based on your actual promotions)

Visit our shop: [CORNBEF: YOUR_WEBSITE_URL]

We're so glad you're here!

Warm regards,
The PHEpoxyWorld Woodcraft Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To unsubscribe, reply to this email with "UNSUBSCRIBE" in the subject line.
            `.trim(),
            Charset: 'UTF-8',
          },
        },
      },
    });

    await sesClient.send(welcomeEmailCommand);

    // Optionally publish to SNS for additional workflows
    if (process.env.SNS_TOPIC_ARN) {
      const snsCommand = new PublishCommand({
        TopicArn: process.env.SNS_TOPIC_ARN,
        Subject: 'New Newsletter Subscriber',
        Message: JSON.stringify({
          email: normalizedEmail,
          subscribedAt: timestamp,
          source: 'website',
        }),
      });

      await snsClient.send(snsCommand);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Welcome to the workshop! Check your email for confirmation.' 
      }),
    };

  } catch (error) {
    console.error('Error processing newsletter subscription:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to subscribe. Please try again later.' 
      }),
    };
  }
};
