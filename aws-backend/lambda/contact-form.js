const AWS = require('aws-sdk');
const PDFDocument = require('pdfkit');
const { Readable } = require('stream');

const ses = new AWS.SES({ region: 'us-east-1' });

// Email configuration
const FROM_EMAIL = 'PHEpros@proton.me';
const TO_EMAIL = 'PHEpros@proton.me';
const REPLY_TO = 'PHEpros@proton.me';

/**
 * Lambda handler for contact form and custom order submissions
 * Sends HTML email with PDF attachment containing all submission details
 */
exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
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
    
    // Validate required fields
    const { name, email, subject, message } = body;
    if (!name || !email || !message) {
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: 'Missing required fields: name, email, message' })
        };
    }
    
    // Determine if this is a custom order or regular contact
    const isCustomOrder = subject && subject.includes('Custom Order Request');
    
    try {
        // Generate PDF
        const pdfBuffer = await generatePDF(body, isCustomOrder);
        
        // Generate HTML email
        const htmlContent = generateHTMLEmail(body, isCustomOrder);
        
        // Send email with PDF attachment
        await sendEmailWithAttachment({
            name,
            email,
            subject: subject || 'Contact Form Submission',
            htmlContent,
            pdfBuffer,
            isCustomOrder
        });
        
        // Send auto-reply to customer
        await sendAutoReply(email, name, isCustomOrder);
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Submission received successfully',
                type: isCustomOrder ? 'custom_order' : 'contact'
            })
        };
        
    } catch (error) {
        console.error('Error processing submission:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Error processing your submission. Please try again.',
                error: error.message
            })
        };
    }
};

/**
 * Generate PDF document from submission data
 */
async function generatePDF(data, isCustomOrder) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const chunks = [];
        
        // Collect PDF data
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);
        
        const timestamp = new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            dateStyle: 'full',
            timeStyle: 'long'
        });
        
        // Header
        doc.fontSize(24)
           .fillColor('#16A34A')
           .text('PHEpoxyWorld', { align: 'center' });
        
        doc.fontSize(10)
           .fillColor('#6B7280')
           .text('3D Printing & Epoxy Art', { align: 'center' });
        
        doc.moveDown(0.5);
        doc.fontSize(16)
           .fillColor('#1F2937')
           .text(isCustomOrder ? 'Custom Order Request' : 'Contact Form Submission', { align: 'center' });
        
        doc.moveDown(0.5);
        doc.fontSize(9)
           .fillColor('#6B7280')
           .text(`Received: ${timestamp}`, { align: 'center' });
        
        doc.moveDown(2);
        
        // Divider line
        doc.moveTo(50, doc.y)
           .lineTo(doc.page.width - 50, doc.y)
           .strokeColor('#D1D5DB')
           .stroke();
        
        doc.moveDown();
        
        // Contact Information Section
        addSection(doc, 'CONTACT INFORMATION');
        addField(doc, 'Name', data.name);
        addField(doc, 'Email', data.email);
        if (data.phone) {
            addField(doc, 'Phone', data.phone);
        }
        
        doc.moveDown();
        
        if (isCustomOrder) {
            // Custom Order Specific Fields
            addSection(doc, 'ORDER DETAILS');
            if (data.category) addField(doc, 'Category', data.category);
            if (data.fabricationType) addField(doc, 'Fabrication Type', data.fabricationType);
            if (data.size || data.sizeLength) {
                const sizeText = data.size || `${data.sizeLength} ${data.sizeUnit || 'inches'}`;
                addField(doc, 'Size', sizeText);
            }
            if (data.quantity) addField(doc, 'Quantity', data.quantity);
            if (data.targetDate) addField(doc, 'Target Completion', data.targetDate);
            
            doc.moveDown();
            
            // Preferences Section
            if (data.materialPreference || data.colorPreferences || data.budgetRange) {
                addSection(doc, 'PREFERENCES');
                if (data.materialPreference) addField(doc, 'Material Preference', data.materialPreference);
                if (data.colorPreferences) addField(doc, 'Color Preferences', data.colorPreferences);
                if (data.budgetRange) addField(doc, 'Budget Range', data.budgetRange);
                doc.moveDown();
            }
        } else {
            // Regular Contact Form
            if (data.subject) {
                doc.moveDown();
                addSection(doc, 'SUBJECT');
                doc.fontSize(11)
                   .fillColor('#374151')
                   .text(data.subject, { align: 'left' });
                doc.moveDown();
            }
        }
        
        // Message/Description Section
        addSection(doc, isCustomOrder ? 'PROJECT DESCRIPTION' : 'MESSAGE');
        doc.fontSize(10)
           .fillColor('#374151')
           .text(data.message || data.description || 'No message provided', {
               align: 'left',
               lineGap: 2
           });
        
        doc.moveDown();
        
        // File Attachments (if any)
        if (data.fileNames || data.files) {
            doc.moveDown();
            addSection(doc, 'ATTACHMENTS');
            const files = data.fileNames || (data.files && data.files.length ? 
                `${data.files.length} file(s) uploaded` : 'None');
            doc.fontSize(10)
               .fillColor('#6B7280')
               .text(files);
            doc.fontSize(9)
               .fillColor('#EF4444')
               .text('Note: Files cannot be attached to email. Please contact customer to arrange file transfer.', {
                   align: 'left',
                   oblique: true
               });
        }
        
        // Footer
        doc.moveDown(3);
        doc.moveTo(50, doc.y)
           .lineTo(doc.page.width - 50, doc.y)
           .strokeColor('#D1D5DB')
           .stroke();
        
        doc.moveDown(0.5);
        doc.fontSize(8)
           .fillColor('#9CA3AF')
           .text('PHEpoxyWorld - Custom 3D Printing & Epoxy Art', { align: 'center' });
        doc.text('Fabrication Studio Lane, Atlanta, GA', { align: 'center' });
        doc.text('PHEpros@proton.me', { align: 'center', link: 'mailto:PHEpros@proton.me' });
        
        // Finalize PDF
        doc.end();
    });
}

/**
 * Helper function to add section headers to PDF
 */
function addSection(doc, title) {
    doc.fontSize(11)
       .fillColor('#16A34A')
       .text(title, { underline: true });
    doc.moveDown(0.3);
}

/**
 * Helper function to add field labels and values to PDF
 */
function addField(doc, label, value) {
    doc.fontSize(9)
       .fillColor('#6B7280')
       .text(`${label}:`, { continued: true })
       .fillColor('#1F2937')
       .text(` ${value || 'Not provided'}`);
    doc.moveDown(0.2);
}

/**
 * Generate HTML email content
 */
function generateHTMLEmail(data, isCustomOrder) {
    const timestamp = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'long'
    });
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${isCustomOrder ? 'Custom Order Request' : 'Contact Form Submission'}</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #1F2937;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #F3F4F6;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #16A34A 0%, #15803D 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
        }
        .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 30px 20px;
        }
        .section {
            margin-bottom: 25px;
        }
        .section-title {
            font-size: 14px;
            font-weight: 700;
            color: #16A34A;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #16A34A;
        }
        .field {
            margin-bottom: 12px;
        }
        .field-label {
            font-size: 12px;
            font-weight: 600;
            color: #6B7280;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        .field-value {
            font-size: 15px;
            color: #1F2937;
            margin-top: 3px;
        }
        .message-box {
            background-color: #F9FAFB;
            border-left: 4px solid #16A34A;
            padding: 15px;
            margin-top: 10px;
            border-radius: 4px;
        }
        .footer {
            background-color: #F9FAFB;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6B7280;
            border-top: 1px solid #E5E7EB;
        }
        .timestamp {
            font-size: 11px;
            color: #9CA3AF;
            text-align: center;
            margin-bottom: 20px;
        }
        .badge {
            display: inline-block;
            background-color: #FFC857;
            color: #1F2937;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            margin-top: 10px;
        }
        .attachment-note {
            background-color: #FEF2F2;
            border-left: 4px solid #EF4444;
            padding: 12px;
            margin-top: 15px;
            font-size: 13px;
            color: #991B1B;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>PHEpoxyWorld</h1>
            <p>3D Printing & Epoxy Art</p>
            <div class="badge">${isCustomOrder ? 'CUSTOM ORDER REQUEST' : 'CONTACT FORM'}</div>
        </div>
        
        <div class="content">
            <div class="timestamp">Received: ${timestamp}</div>
            
            <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="field">
                    <div class="field-label">Name</div>
                    <div class="field-value">${data.name}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email</div>
                    <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>
                ${data.phone ? `
                <div class="field">
                    <div class="field-label">Phone</div>
                    <div class="field-value">${data.phone}</div>
                </div>
                ` : ''}
            </div>
            
            ${isCustomOrder ? `
            <div class="section">
                <div class="section-title">Order Details</div>
                ${data.category ? `
                <div class="field">
                    <div class="field-label">Category</div>
                    <div class="field-value">${data.category}</div>
                </div>
                ` : ''}
                ${data.fabricationType ? `
                <div class="field">
                    <div class="field-label">Fabrication Type</div>
                    <div class="field-value">${data.fabricationType}</div>
                </div>
                ` : ''}
                ${data.size || data.sizeLength ? `
                <div class="field">
                    <div class="field-label">Size</div>
                    <div class="field-value">${data.size || `${data.sizeLength} ${data.sizeUnit || 'inches'}`}</div>
                </div>
                ` : ''}
                ${data.quantity ? `
                <div class="field">
                    <div class="field-label">Quantity</div>
                    <div class="field-value">${data.quantity}</div>
                </div>
                ` : ''}
                ${data.targetDate ? `
                <div class="field">
                    <div class="field-label">Target Completion</div>
                    <div class="field-value">${data.targetDate}</div>
                </div>
                ` : ''}
            </div>
            
            ${data.materialPreference || data.colorPreferences || data.budgetRange ? `
            <div class="section">
                <div class="section-title">Preferences</div>
                ${data.materialPreference ? `
                <div class="field">
                    <div class="field-label">Material Preference</div>
                    <div class="field-value">${data.materialPreference}</div>
                </div>
                ` : ''}
                ${data.colorPreferences ? `
                <div class="field">
                    <div class="field-label">Color Preferences</div>
                    <div class="field-value">${data.colorPreferences}</div>
                </div>
                ` : ''}
                ${data.budgetRange ? `
                <div class="field">
                    <div class="field-label">Budget Range</div>
                    <div class="field-value">${data.budgetRange}</div>
                </div>
                ` : ''}
            </div>
            ` : ''}
            ` : ''}
            
            ${!isCustomOrder && data.subject ? `
            <div class="section">
                <div class="section-title">Subject</div>
                <div class="field-value">${data.subject}</div>
            </div>
            ` : ''}
            
            <div class="section">
                <div class="section-title">${isCustomOrder ? 'Project Description' : 'Message'}</div>
                <div class="message-box">
                    ${(data.message || data.description || 'No message provided').replace(/\n/g, '<br>')}
                </div>
            </div>
            
            ${data.fileNames || (data.files && data.files.length) ? `
            <div class="section">
                <div class="section-title">Attachments</div>
                <div class="field-value">
                    ${data.fileNames || `${data.files.length} file(s) uploaded`}
                </div>
                <div class="attachment-note">
                    ⚠️ Note: Files cannot be attached to email. Please contact customer to arrange file transfer.
                </div>
            </div>
            ` : ''}
        </div>
        
        <div class="footer">
            <p><strong>PHEpoxyWorld</strong></p>
            <p>Custom 3D Printing & Epoxy Art</p>
            <p>Fabrication Studio Lane, Atlanta, GA</p>
            <p><a href="mailto:PHEpros@proton.me">PHEpros@proton.me</a></p>
            <p style="margin-top: 15px; font-size: 11px;">
                📎 A detailed PDF summary is attached to this email for offline reference.
            </p>
        </div>
    </div>
</body>
</html>
    `;
}

/**
 * Send email with PDF attachment using AWS SES
 */
async function sendEmailWithAttachment({ name, email, subject, htmlContent, pdfBuffer, isCustomOrder }) {
    const boundary = `----=_Part_${Date.now()}`;
    const timestamp = new Date().toISOString().split('T')[0];
    const pdfFilename = `PHEpoxyWorld-${isCustomOrder ? 'CustomOrder' : 'Contact'}-${timestamp}.pdf`;
    
    const rawEmail = [
        `From: PHEpoxyWorld <${FROM_EMAIL}>`,
        `To: ${TO_EMAIL}`,
        `Reply-To: ${email}`,
        `Subject: ${subject} - ${name}`,
        `MIME-Version: 1.0`,
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        ``,
        `--${boundary}`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: 7bit`,
        ``,
        htmlContent,
        ``,
        `--${boundary}`,
        `Content-Type: application/pdf; name="${pdfFilename}"`,
        `Content-Description: ${pdfFilename}`,
        `Content-Disposition: attachment; filename="${pdfFilename}"`,
        `Content-Transfer-Encoding: base64`,
        ``,
        pdfBuffer.toString('base64'),
        ``,
        `--${boundary}--`
    ].join('\r\n');
    
    const params = {
        RawMessage: {
            Data: rawEmail
        }
    };
    
    return ses.sendRawEmail(params).promise();
}

/**
 * Send auto-reply to customer
 */
async function sendAutoReply(customerEmail, customerName, isCustomOrder) {
    const subject = isCustomOrder ? 
        'Thank you for your custom order request!' : 
        'Thank you for contacting PHEpoxyWorld';
    
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
            padding: 30px 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: white;
            padding: 30px 20px;
            border: 1px solid #E5E7EB;
            border-top: none;
            border-radius: 0 0 8px 8px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #6B7280;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">PHEpoxyWorld</h1>
        <p style="margin: 5px 0 0 0;">3D Printing & Epoxy Art</p>
    </div>
    <div class="content">
        <p>Hi ${customerName},</p>
        
        <p>${isCustomOrder ? 
            'Thank you for submitting your custom order request! We\'re excited to bring your vision to life.' :
            'Thank you for reaching out to PHEpoxyWorld!'
        }</p>
        
        <p>${isCustomOrder ?
            'We\'ve received all the details of your project and will review them carefully. You can expect to hear back from us within 24-48 hours with:' :
            'We\'ve received your message and will get back to you as soon as possible, typically within 24 hours.'
        }</p>
        
        ${isCustomOrder ? `
        <ul>
            <li>A detailed quote based on your specifications</li>
            <li>Estimated timeline for completion</li>
            <li>Any questions we have about your design</li>
            <li>Options for materials and finishes</li>
        </ul>
        ` : ''}
        
        <p>In the meantime, feel free to:</p>
        <ul>
            <li>Browse our full catalog at <a href="https://d1o9vf52vkst66.cloudfront.net">our website</a></li>
            <li>Check out our gallery of completed projects</li>
            ${isCustomOrder ? '<li>Send any additional reference images or details</li>' : ''}
        </ul>
        
        <p>If you have any urgent questions, don't hesitate to reply to this email.</p>
        
        <p>Best regards,<br>
        <strong>The PHEpoxyWorld Team</strong></p>
    </div>
    <div class="footer">
        <p><strong>PHEpoxyWorld</strong> - Custom 3D Printing & Epoxy Art</p>
        <p>Fabrication Studio Lane, Atlanta, GA</p>
        <p><a href="mailto:PHEpros@proton.me">PHEpros@proton.me</a></p>
    </div>
</body>
</html>
    `;
    
    const params = {
        Source: FROM_EMAIL,
        Destination: {
            ToAddresses: [customerEmail]
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: 'UTF-8'
            },
            Body: {
                Html: {
                    Data: htmlBody,
                    Charset: 'UTF-8'
                }
            }
        },
        ReplyToAddresses: [REPLY_TO]
    };
    
    return ses.sendEmail(params).promise();
}
