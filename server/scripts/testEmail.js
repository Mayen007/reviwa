import dotenv from 'dotenv';
import { sendGmail, EMAIL_FROM } from '../config/gmail.js';

// Load environment variables
dotenv.config();

const testEmail = async () => {
  console.log('🚀 Starting email test (Gmail API)...');
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Client ID Set: ${process.env.GMAIL_CLIENT_ID ? 'YES' : 'NO'}`);
  console.log(`Client Secret Set: ${process.env.GMAIL_CLIENT_SECRET ? 'YES' : 'NO'}`);
  console.log(`Refresh Token Set: ${process.env.GMAIL_REFRESH_TOKEN ? 'YES' : 'NO'}`);
  console.log(`Email From: ${EMAIL_FROM}`);

  if (!process.env.GMAIL_REFRESH_TOKEN) {
    console.error('❌ GMAIL_REFRESH_TOKEN not found. Please set it in your .env file.');
    process.exit(1);
  }

  try {
    console.log('Attempting to send test email...');

    const result = await sendGmail(
      process.env.EMAIL_USER, // Send to self
      'Reviwa Test Email 🚀',
      '<h1>It Works!</h1><p>This is a test email from the Reviwa backend using Gmail API.</p>'
    );

    if (!result.success) {
      console.error('❌ Test failed:', result.error);
      process.exit(1);
    }

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', result.messageId);
    process.exit(0);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
};

testEmail();
