import express from 'express';
import { sendTestEmail } from '../services/email.service.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @route   POST /api/email/test
 * @desc    Send a test email (Admin only)
 * @access  Private/Admin
 */
router.post('/test', protect, admin, async (req, res) => {
  try {
    const { email } = req.body;
    const targetEmail = email || req.user.email; // Default to admin's email

    const result = await sendTestEmail(targetEmail);

    if (result.success) {
      res.json({ message: 'Test email sent successfully', info: result });
    } else {
      res.status(500).json({ message: 'Failed to send test email', error: result.error });
    }
  } catch (error) {
    console.error('Error in test email route:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
