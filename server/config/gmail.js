import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;

// Ensure sender name is always "Reviwa"
const rawFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;
// Extract just the email address (remove any existing name)
const emailMatch = rawFrom ? rawFrom.match(/<([^>]+)>/) : null;
const emailAddress = emailMatch ? emailMatch[1] : (rawFrom ? rawFrom.trim() : '');

export const EMAIL_FROM = `"Reviwa" <${emailAddress}>`;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

if (REFRESH_TOKEN) {
  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
} else {
  console.warn('⚠️  GMAIL_REFRESH_TOKEN is not defined. Email sending will fail.');
}

export const sendGmail = async (to, subject, html) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    // Use googleapis directly to be 100% sure we are using HTTP.
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // Create the raw email string
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      `From: ${EMAIL_FROM}`,
      `To: ${to}`,
      `Subject: ${utf8Subject}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      html,
    ];
    const message = messageParts.join('\n');

    // The body needs to be base64url encoded.
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return { success: true, messageId: res.data.id };

  } catch (error) {
    console.error('❌ Error sending email via Gmail API:', error);
    return { success: false, error: error.message };
  }
};
