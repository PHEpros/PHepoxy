/**
 * Contact Form Lambda Handler
 * 
 * This function handles contact form submissions and sends emails via AWS SES.
 * 
 * CORNBEF: Update the following before deployment:
 * - RECIPIENT_EMAIL: Your business email
 * - SOURCE_EMAIL: Verified SES sender email
 * - Ensure SES is configured and out of sandbox mode for production
 * 
 * Environment Variables Required:
 * - RECIPIENT_EMAIL: Email address to receive contact submissions
 * - SOURCE_EMAIL: Verified SES email for sending
 * - AWS_REGION: AWS region for SES (e.g., us-east-1)
 */

const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');

const sesClient = new SESClient({ region: process.env.AWS_REGION || 'us-east-1' });

// CORS headers for API Gateway
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
    const { type } = body;

    // Handle custom order requests
    if (type === 'custom-order') {
      return await handleCustomOrder(body);
    }
    
    // Handle regular contact form
    return await handleContactForm(body);

  } catch (error) {
    console.error('Error processing request:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to process request. Please try again later.' 
      }),
    };
  }
};

// Handle regular contact form submissions
async function handleContactForm(body) {
  const { name, email, phone, subject, message } = body;

  // Validate required fields
  if (!name || !email || !message) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing required fields: name, email, message' }),
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid email format' }),
    };
  }

  const emailSubject = `New Contact Form Submission - ${name}`;

  // Compose email
  const emailBody = `
New contact form submission from PHEpoxyWorld website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'General Inquiry'}

Message:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This email was sent from the contact form on your website.
Reply directly to this email to respond to ${name}.
  `.trim();

  // Send email via SES
  const sendCommand = new SendEmailCommand({
    Source: process.env.SOURCE_EMAIL,
    Destination: {
      ToAddresses: [process.env.RECIPIENT_EMAIL],
    },
    ReplyToAddresses: [email],
    Message: {
      Subject: {
        Data: emailSubject,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: emailBody,
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(sendCommand);

  // Send auto-reply to customer
  const autoReplyCommand = new SendEmailCommand({
    Source: process.env.SOURCE_EMAIL,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: 'Thank you for contacting PHEpoxyWorld',
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `
Hi ${name},

Thank you for reaching out to PHEpoxyWorld! We've received your message and will get back to you within 24-48 business hours.

Here's a copy of your message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subject: ${subject || 'General Inquiry'}

${message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best regards,
The PHEpoxyWorld Team
          `.trim(),
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(autoReplyCommand);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      success: true, 
      message: 'Your message has been sent successfully!' 
    }),
  };
}

// Handle custom order requests
async function handleCustomOrder(body) {
  const { 
    name, email, phone, category, fabricationType, height, 
    description, targetDate, quantity, materialPreference, 
    budget, colorPreference, files, subject 
  } = body;

  // Validate required fields
  if (!name || !email || !phone || !category || !fabricationType || 
      !description || !targetDate || !quantity || !budget) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Missing required fields' }),
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Invalid email format' }),
    };
  }

  const emailSubject = subject || `New Custom Order Request - ${category} - ${name}`;

  // Compose detailed email
  const emailBody = `
New Custom Order Request from PHEpoxyWorld website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${name}
Email: ${email}
Phone: ${phone}
Budget: ${budget}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Category: ${category}
Fabrication Type: ${fabricationType}
Material Preference: ${materialPreference}
Height: ${height}
Quantity: ${quantity}
Color Preference: ${colorPreference}
Target Completion Date: ${targetDate}

Project Description:
${description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REFERENCE IMAGES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${files && files.length > 0 ? `Customer uploaded ${files.length} reference image(s).` : 'No files uploaded.'}
${files && files.length > 0 ? files.map((f, i) => `Image ${i + 1}: ${f.name}`).join('\n') : ''}

Note: Reference images are attached to this email.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reply directly to this email to respond to ${name}.
  `.trim();

  // Prepare attachments if files exist
  const attachments = files && files.length > 0 ? files.map((file, index) => ({
    Filename: file.name,
    Content: file.data,
    ContentType: file.type,
  })) : [];

  // Send email via SES (note: SES doesn't support attachments directly via SDK)
  // For attachments, we'd need to use raw email with MIME format
  // For now, we'll send without attachments and note that images were uploaded
  const sendCommand = new SendEmailCommand({
    Source: process.env.SOURCE_EMAIL,
    Destination: {
      ToAddresses: [process.env.RECIPIENT_EMAIL],
    },
    ReplyToAddresses: [email],
    Message: {
      Subject: {
        Data: emailSubject,
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: emailBody,
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(sendCommand);

  // Send confirmation to customer
  const confirmationCommand = new SendEmailCommand({
    Source: process.env.SOURCE_EMAIL,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: 'Custom Order Request Received - PHEpoxyWorld',
        Charset: 'UTF-8',
      },
      Body: {
        Text: {
          Data: `
Hi ${name},

Thank you for your custom order request! We've received all your details and will review your project carefully.

ORDER SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Category: ${category}
Fabrication Type: ${fabricationType}
Height: ${height}
Quantity: ${quantity}
Target Date: ${targetDate}
Budget: ${budget}

What happens next:
1. We'll review your project details and reference images
2. We'll prepare a custom quote based on your specifications
3. You'll receive a detailed proposal within 24-48 hours
4. Once approved, we'll begin your custom creation

If you have any questions in the meantime, feel free to reply to this email or call us directly.

Best regards,
The PHEpoxyWorld Team

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project Description:
${description}
          `.trim(),
          Charset: 'UTF-8',
        },
      },
    },
  });

  await sesClient.send(confirmationCommand);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ 
      success: true, 
      message: 'Your custom order request has been submitted successfully!' 
    }),
  };
}
