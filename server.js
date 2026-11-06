import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create reusable Nodemailer transporter using SMTP credentials from .env
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn('⚠️  Warning: SMTP configuration is missing in .env file (SMTP_HOST, SMTP_USER, SMTP_PASS).');
  }

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure, // true for 465, false for 587 or 25
    auth: {
      user: user,
      pass: pass,
    },
    // Useful for corporate or self-signed certificates if required
    tls: {
      rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false',
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'kRa Life Sciences Contact API', time: new Date().toISOString() });
});

// Contact enquiry endpoint (handles both Contact section form & Modal popup)
app.post('/api/contact', async (req, res) => {
  try {
    const {
      fullName,
      organisation,
      email,
      phone,
      areaOfInterest,
      requirements,
      formType = 'Contact Form',
    } = req.body;

    // Validate required fields
    if (!fullName || !organisation || !email || !requirements) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (Full Name, Organisation, Business Email, Requirements).',
      });
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid business email address.',
      });
    }

    const transporter = createTransporter();

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER;
    const senderName = process.env.SMTP_FROM_NAME || 'kRa Life Sciences Website';
    const fromAddress = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER;

    // 1. Send notification email to kRa Life Sciences administration
    const adminMailOptions = {
      from: `"${senderName}" <${fromAddress}>`,
      to: receiverEmail,
      replyTo: email, // Replying in mail client goes directly to the enquirer
      subject: `New Programme Enquiry: ${fullName} - ${organisation} [${formType}]`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
            .header { background: linear-gradient(135deg, #0078B8 0%, #0094C6 50%, #002B49 100%); color: #ffffff; padding: 24px; }
            .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
            .header p { margin: 6px 0 0; font-size: 13px; opacity: 0.9; }
            .content { padding: 24px; }
            .tag { display: inline-block; background: #e0f2fe; color: #0284c7; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 10px; border-radius: 9999px; margin-bottom: 16px; }
            .field-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .field-table td { padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; vertical-align: top; }
            .field-label { width: 35%; color: #64748b; font-weight: 600; }
            .field-value { width: 65%; color: #0f172a; font-weight: 500; }
            .requirements-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 8px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
            .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Consultation & Programme Enquiry</h2>
              <p>Submitted via kRa Life Sciences website (${formType})</p>
            </div>
            <div class="content">
              <span class="tag">${formType}</span>
              <table class="field-table">
                <tr>
                  <td class="field-label">Full Name:</td>
                  <td class="field-value"><strong>${fullName}</strong></td>
                </tr>
                <tr>
                  <td class="field-label">Organisation:</td>
                  <td class="field-value">${organisation}</td>
                </tr>
                <tr>
                  <td class="field-label">Business Email:</td>
                  <td class="field-value"><a href="mailto:${email}" style="color: #0078B8; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td class="field-label">Phone Number:</td>
                  <td class="field-value">${phone ? phone : '<em>Not provided</em>'}</td>
                </tr>
                <tr>
                  <td class="field-label">Area of Interest:</td>
                  <td class="field-value"><strong style="color: #0078B8;">${areaOfInterest || 'General Enquiry'}</strong></td>
                </tr>
                <tr>
                  <td class="field-label">Submission Time:</td>
                  <td class="field-value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td>
                </tr>
              </table>

              <div style="font-weight: 600; font-size: 13px; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 12px;">
                Description of Requirements:
              </div>
              <div class="requirements-box">
                ${requirements}
              </div>
            </div>
            <div class="footer">
              This email was generated automatically by the kRa Life Sciences portal contact system.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send admin notification
    await transporter.sendMail(adminMailOptions);

    // 2. Optionally send an automated confirmation acknowledgement to the client
    if (process.env.SEND_CLIENT_CONFIRMATION === 'true') {
      try {
        const clientAckOptions = {
          from: `"${senderName}" <${fromAddress}>`,
          to: email,
          subject: 'We have received your enquiry — kRa Life Sciences',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 20px; }
                .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }
                .header { background: #002B49; color: #ffffff; padding: 24px; text-align: center; }
                .content { padding: 24px 28px; line-height: 1.6; font-size: 14px; color: #334155; }
                .footer { padding: 16px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin:0; font-size: 20px;">kRa Life Sciences</h2>
                  <p style="margin:4px 0 0; font-size: 12px; opacity: 0.85;">Clinical Trial Consulting & Development Solutions</p>
                </div>
                <div class="content">
                  <p>Dear ${fullName},</p>
                  <p>Thank you for reaching out to <strong>kRa Life Sciences</strong> regarding <strong>${areaOfInterest}</strong>.</p>
                  <p>We have received your enquiry and our advisory leadership team will review your objectives and connect with you within <strong>24–48 business hours</strong>.</p>
                  <p style="margin-top: 24px;">Warm regards,<br><strong>Clinical Development Team</strong><br>kRa Life Sciences</p>
                </div>
                <div class="footer">
                  Bengaluru, India • Multi-Geography Reach • www.kralifesciences.com
                </div>
              </div>
            </body>
            </html>
          `,
        };
        await transporter.sendMail(clientAckOptions);
      } catch (ackError) {
        // Log acknowledgement failure without failing the user's primary submission
        console.error('Client auto-reply notice failed to send:', ackError);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been received successfully. Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('Error sending email through Nodemailer:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to send message at this time. Please try again or contact us directly at contact@kralifesciences.com.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 kRa Life Sciences Mail Server running on http://localhost:${PORT}`);
});

