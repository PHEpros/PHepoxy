const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
const ses = new AWS.SES({ region: 'us-east-1' });

const TABLE_NAME = 'phepros-prod-newsletter';
const FROM_EMAIL = 'PHEpros@proton.me';

/**
 * Lambda handler for newsletter subscriptions
 * Stores email in DynamoDB and sends welcome email
 */
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }
    
    // Parse request body
    let body;
    try {
        body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (error) {
        console.error('Error parsing body:', error);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Invalid request format' })
        };
    }
    
    const { email } = body;
    
    // Validate email
    if (!email || !isValidEmail(email)) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Valid email address is required' })
        };
    }
    
    try {
        // Check if email already subscribed
        const existing = await dynamodb.get({
            TableName: TABLE_NAME,
            Key: { email }
        }).promise();
        
        if (existing.Item) {
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'You are already subscribed to our newsletter!',
                    alreadySubscribed: true
                })
            };
        }
        
        // Store subscription in DynamoDB
        await dynamodb.put({
            TableName: TABLE_NAME,
            Item: {
                email,
                subscribedAt: new Date().toISOString(),
                status: 'active',
                source: 'website'
            }
        }).promise();
        
        // Send welcome email
        await sendWelcomeEmail(email);
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Successfully subscribed to newsletter!',
                email
            })
        };
        
    } catch (error) {
        console.error('Error processing subscription:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Error processing subscription. Please try again.',
                error: error.message
            })
        };
    }
};

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Send welcome email to new subscriber
 */
async function sendWelcomeEmail(email) {
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1F2937;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: white;
            padding: 30px 20px;
            border: 1px solid #E5E7EB;
            border-top: none;
        }
        .feature {
            background: #F9FAFB;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #16A34A;
            border-radius: 4px;
        }
        .cta {
            text-align: center;
            padding: 20px 0;
        }
        .button {
            display: inline-block;
            background: #16A34A;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #6B7280;
            border-radius: 0 0 8px 8px;
            background: #F9FAFB;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0; font-size: 32px;">Welcome to PHEpoxyWorld!</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">
            🎨 Where 3D Printing Meets Artistry
        </p>
    </div>
    <div class="content">
        <p>Thanks for joining our community of makers, collectors, and art enthusiasts!</p>
        
        <p>As a newsletter subscriber, you'll be the first to know about:</p>
        
        <div class="feature">
            <strong>🚀 New Product Launches</strong><br>
            Get exclusive early access to our latest 3D printed sculptures and epoxy art pieces.
        </div>
        
        <div class="feature">
            <strong>💰 Special Offers & Discounts</strong><br>
            Subscriber-only promotions and seasonal sales you won't find anywhere else.
        </div>
        
        <div class="feature">
            <strong>🎓 Behind-the-Scenes Content</strong><br>
            Learn about our fabrication process, material selection, and design techniques.
        </div>
        
        <div class="feature">
            <strong>✨ Featured Custom Projects</strong><br>
            See what we're creating for customers and get inspiration for your own custom order.
        </div>
        
        <div class="cta">
            <a href="https://d1o9vf52vkst66.cloudfront.net/products" class="button">
                Browse Our Catalog
            </a>
        </div>
        
        <p style="margin-top: 30px;">
            Want to create something unique? Check out our 
            <a href="https://d1o9vf52vkst66.cloudfront.net/custom-order" style="color: #16A34A; font-weight: 600;">Custom Orders page</a> 
            to bring your vision to life!
        </p>
        
        <p style="margin-top: 30px; font-size: 14px; color: #6B7280;">
            Have questions or want to share your ideas? Just reply to this email - we'd love to hear from you!
        </p>
    </div>
    <div class="footer">
        <p><strong>PHEpoxyWorld</strong> - Custom 3D Printing & Epoxy Art</p>
        <p>Fabrication Studio Lane, Atlanta, GA</p>
        <p><a href="mailto:PHEpros@proton.me" style="color: #16A34A;">PHEpros@proton.me</a></p>
        <p style="margin-top: 15px; font-size: 11px;">
            You're receiving this because you subscribed to our newsletter.<br>
            <a href="mailto:PHEpros@proton.me?subject=Unsubscribe" style="color: #6B7280;">Unsubscribe</a>
        </p>
    </div>
</body>
</html>
    `;
    
    const params = {
        Source: FROM_EMAIL,
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Subject: {
                Data: 'Welcome to PHEpoxyWorld! 🎨',
                Charset: 'UTF-8'
            },
            Body: {
                Html: {
                    Data: htmlBody,
                    Charset: 'UTF-8'
                }
            }
        },
        ReplyToAddresses: [FROM_EMAIL]
    };
    
    return ses.sendEmail(params).promise();
}
