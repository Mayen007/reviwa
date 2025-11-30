import { CLIENT_URL } from '../config/env.js';

// Base email template with improved design and dark mode support
const emailWrapper = (content, title) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    /* Reset */
    body, p, h1, h2, h3, div { margin: 0; padding: 0; }
    
    /* Base */
    body {
      font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #1f2937;
      background-color: #f3f4f6;
      -webkit-font-smoothing: antialiased;
    }
    
    /* Container */
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    /* Header */
    .header {
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      padding: 40px 30px;
      text-align: center;
    }
    
    .logo-container {
      background-color: rgba(255, 255, 255, 0.2);
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .logo {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }
    
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }
    
    /* Content */
    .content {
      padding: 40px 30px;
    }
    
    h2 {
      color: #111827;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    
    p {
      margin-bottom: 16px;
      color: #4b5563;
      font-size: 16px;
    }
    
    strong {
      color: #111827;
      font-weight: 600;
    }
    
    /* Button */
    .button-container {
      text-align: center;
      margin: 30px 0;
    }
    
    .button {
      display: inline-block;
      padding: 14px 32px;
      background-color: #059669;
      color: #ffffff !important;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
      transition: background-color 0.2s;
      box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);
    }
    
    .button:hover {
      background-color: #047857;
    }
    
    /* Highlight Box */
    .highlight {
      background-color: #ecfdf5;
      border: 1px solid #d1fae5;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    
    .highlight p {
      color: #065f46;
      margin-bottom: 8px;
    }
    
    .highlight p:last-child {
      margin-bottom: 0;
    }
    
    /* Badges */
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .badge-pending { background-color: #fffbeb; color: #b45309; border: 1px solid #fcd34d; }
    .badge-verified { background-color: #eff6ff; color: #1d4ed8; border: 1px solid #93c5fd; }
    .badge-in-progress { background-color: #fdf2f8; color: #be185d; border: 1px solid #f9a8d4; }
    .badge-resolved { background-color: #ecfdf5; color: #047857; border: 1px solid #6ee7b7; }
    .badge-rejected { background-color: #fef2f2; color: #b91c1c; border: 1px solid #fca5a5; }
    
    /* Footer */
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer p {
      color: #9ca3af;
      font-size: 13px;
      margin-bottom: 8px;
    }
    
    .footer a {
      color: #6b7280;
      text-decoration: underline;
    }
    
    /* Dark Mode Support */
    @media (prefers-color-scheme: dark) {
      body { background-color: #111827; }
      .container { background-color: #1f2937; box-shadow: none; }
      h2, strong { color: #f3f4f6; }
      p { color: #d1d5db; }
      .footer { background-color: #111827; border-top-color: #374151; }
      .highlight { background-color: #064e3b; border-color: #065f46; }
      .highlight p { color: #d1fae5; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-container">
        <img src="${CLIENT_URL}/logo.png" alt="Reviwa" class="logo" />
      </div>
      <h1>Reviwa</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>This email was sent to you because you have an account on Reviwa.</p>
      <p>© ${new Date().getFullYear()} Reviwa. All rights reserved.</p>
      <p><a href="${CLIENT_URL}">Visit Website</a> • <a href="mailto:support@reviwa.com">Contact Support</a></p>
    </div>
  </div>
</body>
</html>
`;

// Welcome email
export const welcomeEmail = (userName) => {
  const content = `
    <h2>Welcome to Reviwa! 👋</h2>
    <p>Hi <strong>${userName}</strong>,</p>
    <p>We're thrilled to have you join our community of eco-warriors! Reviwa is all about empowering citizens like you to make our cities cleaner and greener.</p>
    
    <div class="highlight">
      <p><strong>🚀 Get Started:</strong></p>
      <ul style="padding-left: 20px; margin-top: 10px; color: #065f46;">
        <li style="margin-bottom: 5px;">Snap a photo of waste in your area</li>
        <li style="margin-bottom: 5px;">Submit a report with location details</li>
        <li style="margin-bottom: 5px;">Earn eco-points when it gets resolved</li>
      </ul>
    </div>

    <p>Your first contribution is just a click away. Let's clean up our city together!</p>
    
    <div class="button-container">
      <a href="${CLIENT_URL}/create-report" class="button">Report Waste Now</a>
    </div>
    
    <p>If you have any questions, just reply to this email.</p>
    <p>Cheers,<br><strong>The Reviwa Team</strong></p>
  `;
  return emailWrapper(content, 'Welcome to Reviwa');
};

// Report status update email
export const reportStatusEmail = (userName, reportTitle, oldStatus, newStatus, reportId, adminNotes = '') => {
  const statusMessages = {
    verified: '✅ <strong>Verified:</strong> Our team has confirmed your report. It is now visible to cleanup crews.',
    'in-progress': '🚜 <strong>In Progress:</strong> Cleanup crews are currently working on this site.',
    resolved: '✨ <strong>Resolved:</strong> Great news! The waste has been cleared. You\'ve earned eco-points!',
    rejected: '❌ <strong>Rejected:</strong> This report could not be processed. See notes below.'
  };

  const content = `
    <h2>Report Update 🔔</h2>
    <p>Hi <strong>${userName}</strong>,</p>
    <p>There's an update on your report: <strong>"${reportTitle}"</strong></p>
    
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; padding: 15px 25px; background-color: #f9fafb; border-radius: 8px; border: 1px solid #e5e7eb;">
        <span style="font-size: 14px; color: #6b7280; display: block; margin-bottom: 5px;">Status changed to</span>
        <span class="badge badge-${newStatus}" style="font-size: 16px;">${newStatus.replace('-', ' ')}</span>
      </div>
    </div>

    <div class="highlight">
      <p>${statusMessages[newStatus] || 'The status of your report has changed.'}</p>
    </div>

    ${adminNotes ? `
      <div style="background-color: #fff7ed; border: 1px solid #ffedd5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p style="color: #9a3412; font-weight: 600; margin-bottom: 5px;">📝 Admin Notes:</p>
        <p style="color: #c2410c; margin: 0;">${adminNotes}</p>
      </div>
    ` : ''}

    <div class="button-container">
      <a href="${CLIENT_URL}/reports/${reportId}" class="button">View Report</a>
    </div>
    
    <p>Thanks for helping us keep track!</p>
    <p>Best,<br><strong>The Reviwa Team</strong></p>
  `;
  return emailWrapper(content, `Update: ${reportTitle}`);
};

// New report notification for admins
export const newReportAdminEmail = (reportTitle, reportedBy, wasteType, severity, reportId, location) => {
  const content = `
    <h2>New Report Submitted 📋</h2>
    <p>A new waste report requires your attention.</p>
    
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Title:</td>
          <td style="padding: 8px 0; font-weight: 600;">${reportTitle}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Reporter:</td>
          <td style="padding: 8px 0;">${reportedBy}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Type:</td>
          <td style="padding: 8px 0; text-transform: capitalize;">${wasteType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Severity:</td>
          <td style="padding: 8px 0;"><span class="badge badge-${severity}">${severity}</span></td>
        </tr>
        ${location ? `
        <tr>
          <td style="padding: 8px 0; color: #64748b;">Location:</td>
          <td style="padding: 8px 0;">${location}</td>
        </tr>` : ''}
      </table>
    </div>

    <div class="button-container">
      <a href="${CLIENT_URL}/reports/${reportId}" class="button">Review & Verify</a>
    </div>
  `;
  return emailWrapper(content, 'New Report: ' + reportTitle);
};

// Eco-points milestone email
export const ecoPointsMilestoneEmail = (userName, currentPoints, milestone) => {
  const milestones = {
    10: { emoji: '🌱', title: 'Seedling', message: 'You\'ve planted the seeds of change!' },
    50: { emoji: '🌿', title: 'Green Warrior', message: 'Your impact is growing fast!' },
    100: { emoji: '🌳', title: 'Eco Champion', message: 'You are a pillar of our community!' },
    250: { emoji: '🏆', title: 'Environmental Hero', message: 'An outstanding contribution to the planet!' },
    500: { emoji: '⭐', title: 'Sustainability Legend', message: 'You are inspiring everyone around you!' }
  };

  const achievement = milestones[milestone] || { emoji: '🎉', title: 'Milestone Reached', message: 'Keep up the amazing work!' };

  const content = `
    <div style="text-align: center;">
      <div style="font-size: 48px; margin-bottom: 10px;">${achievement.emoji}</div>
      <h2 style="margin-bottom: 10px;">${achievement.title}</h2>
      <p style="font-size: 18px; color: #059669; font-weight: 600;">${currentPoints} Eco-Points</p>
    </div>

    <div class="highlight" style="text-align: center;">
      <p style="font-size: 16px;">${achievement.message}</p>
    </div>

    <p>Hi <strong>${userName}</strong>,</p>
    <p>Congratulations on reaching this milestone! Your dedication to reporting and cleaning up waste is making a tangible difference in our city.</p>

    <div class="button-container">
      <a href="${CLIENT_URL}/profile" class="button">View Your Impact</a>
    </div>
    
    <p>Keep shining! ✨</p>
    <p>Best,<br><strong>The Reviwa Team</strong></p>
  `;
  return emailWrapper(content, `Milestone: ${currentPoints} Points!`);
};

// Test email template
export const testEmailTemplate = () => {
  const content = `
    <h2>It Works! 🚀</h2>
    <p>This is a test email from the Reviwa backend.</p>
    
    <div class="highlight">
      <p><strong>✅ System Status:</strong> Operational</p>
      <p><strong>📅 Timestamp:</strong> ${new Date().toLocaleString()}</p>
    </div>
    
    <p>If you're seeing this, your email configuration is set up correctly.</p>
    
    <div class="button-container">
      <a href="${CLIENT_URL}" class="button">Go to Dashboard</a>
    </div>
  `;
  return emailWrapper(content, 'Reviwa Test Email');
};

export default {
  welcomeEmail,
  reportStatusEmail,
  newReportAdminEmail,
  ecoPointsMilestoneEmail,
  testEmailTemplate
};
