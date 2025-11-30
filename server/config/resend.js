import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn('⚠️  RESEND_API_KEY is not defined in environment variables.');
}

export const resend = new Resend(resendApiKey);
export const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';
