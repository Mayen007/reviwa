import { sendGmail, EMAIL_FROM } from '../config/gmail.js';
import {
  welcomeEmail,
  reportStatusEmail,
  newReportAdminEmail,
  ecoPointsMilestoneEmail
} from '../utils/emailTemplates.js';

/**
 * Send email using Gmail API
 */
const sendEmail = async (to, subject, html) => {
  try {
    // If no Refresh Token (dev mode without config), just log
    if (!process.env.GMAIL_REFRESH_TOKEN) {
      console.log('\n📧 EMAIL (not sent - no Gmail config):');
      console.log('To:', to);
      console.log('Subject:', subject);
      console.log('---\n');
      return { success: true, mode: 'console' };
    }

    const result = await sendGmail(to, subject, html);

    if (!result.success) {
      console.error('❌ Error sending email:', result.error);
      return { success: false, error: result.error };
    }

    console.log('✅ Email sent:', result.messageId, '| From:', EMAIL_FROM);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Unexpected error sending email:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send welcome email to new users
 */
export const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Welcome to Reviwa! 🌱';
  const html = welcomeEmail(userName);
  return await sendEmail(userEmail, subject, html);
};

/**
 * Send report status update to report owner
 */
export const sendReportStatusUpdate = async (
  userEmail,
  userName,
  reportTitle,
  oldStatus,
  newStatus,
  reportId,
  adminNotes = ''
) => {
  const subject = `Report Update: ${reportTitle}`;
  const html = reportStatusEmail(userName, reportTitle, oldStatus, newStatus, reportId, adminNotes);
  return await sendEmail(userEmail, subject, html);
};

/**
 * Send new report notification to admins
 */
export const sendNewReportNotification = async (
  adminEmail,
  reportTitle,
  reportedBy,
  wasteType,
  severity,
  reportId,
  location = ''
) => {
  const subject = `New Report Submitted: ${reportTitle}`;
  const html = newReportAdminEmail(reportTitle, reportedBy, wasteType, severity, reportId, location);
  return await sendEmail(adminEmail, subject, html);
};

/**
 * Send eco-points milestone achievement email
 */
export const sendEcoPointsMilestone = async (userEmail, userName, currentPoints, milestone) => {
  const subject = `Milestone Reached: ${currentPoints} Eco-Points! 🎉`;
  const html = ecoPointsMilestoneEmail(userName, currentPoints, milestone);
  return await sendEmail(userEmail, subject, html);
};

/**
 * Get all admin emails for notifications
 */
export const getAdminEmails = async (User) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('email');
    return admins.map(admin => admin.email);
  } catch (error) {
    console.error('Error fetching admin emails:', error);
    return [];
  }
};

/**
 * Send a test email to verify configuration
 */
export const sendTestEmail = async (email) => {
  const subject = 'Reviwa Test Email 🚀';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #2E7D32;">It Works! 🎉</h1>
      <p>This is a test email from the Reviwa backend.</p>
      <p>If you received this, your email configuration is working correctly.</p>
      <hr>
      <p style="font-size: 12px; color: #666;">Timestamp: ${new Date().toISOString()}</p>
    </div>
  `;
  return await sendEmail(email, subject, html);
};

export default {
  sendWelcomeEmail,
  sendReportStatusUpdate,
  sendNewReportNotification,
  sendEcoPointsMilestone,
  getAdminEmails,
  sendTestEmail
};
