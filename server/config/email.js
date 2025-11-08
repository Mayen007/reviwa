import { createTransport } from 'nodemailer';
import { EMAIL_USER, EMAIL_PASS, EMAIL_FROM, NODE_ENV } from './env.js';

// Create reusable transporter
const createTransporter = () => {
  // For development, use ethereal email (test account) if no credentials provided
  if (NODE_ENV === 'development' && (!EMAIL_USER || !EMAIL_PASS)) {
    console.log('⚠️  Email credentials not configured. Emails will be logged to console only.');
    return null;
  }

  const config = {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true' || false, // true for 465, false for other ports
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  };

  return createTransport(config);
};

const transporter = createTransporter();

// Verify connection configuration
if (transporter) {
  transporter.verify((error, success) => {
    if (error) {
      console.log('❌ Email configuration error:', error.message);
    } else {
      console.log('✅ Email server is ready to send messages');
    }
  });
}

export { transporter, EMAIL_FROM };
