const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Helper function to send token response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          green_points: user.green_points,
          sustainability_level: user.sustainability_level,
          is_verified: user.is_verified
        }
      },
      sustainabilityMessage: `Welcome to Reviwa, ${user.name}! Ready to make an environmental impact?`
    });
};

// @desc    Register new user (environmental platform user by default)
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password, role, bio, city, state } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email already exists',
        sustainabilityMessage: 'This email is already registered. Please log in to continue your environmental journey!'
      });
    }

    // Validate role (only allow user, environmental_org - admin requires special process)
    const allowedRoles = ['user', 'environmental_org'];
    const userRole = role && allowedRoles.includes(role) ? role : 'user';

    // Create user data
    const userData = {
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role: userRole,
      bio: bio ? bio.trim() : undefined
    };

    // Add location if provided
    if (city || state) {
      userData.location = {
        city: city ? city.trim() : undefined,
        state: state ? state.trim() : undefined
      };
    }

    // Create user
    const user = await User.create(userData);

    // Award welcome green points for new environmental platform users
    if (userRole === 'user') {
      await user.addGreenPoints(10, 'welcome_bonus');
    }

    // Log registration for environmental engagement tracking
    console.log(`� New ${userRole} registered:`, {
      name: user.name,
      email: user.email,
      location: user.location?.city || 'Not provided',
      timestamp: new Date().toISOString()
    });

    sendTokenResponse(user, 201, res);

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.',
      sustainabilityMessage: 'We encountered an issue setting up your environmental profile. Please try again!'
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Check for email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
        sustainabilityMessage: 'Please enter your credentials to access your environmental profile'
      });
    }

    // Check for user (include password for comparison)
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        sustainabilityMessage: 'No account found with this email. Join the environmental community by registering!'
      });
    }

    // Check if account is active
    if (!user.is_active) {
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated. Please contact support.',
        sustainabilityMessage: 'Your environmental account is currently inactive. Contact our sustainability support team.'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        sustainabilityMessage: 'Incorrect password. Please try again or reset your password.'
      });
    }

    // Update last login
    user.last_login = new Date();
    await user.save({ validateBeforeSave: false });

    // Log successful login for environmental engagement tracking
    console.log(`🌱 User logged in:`, {
      name: user.name,
      email: user.email,
      role: user.role,
      green_points: user.green_points,
      timestamp: new Date().toISOString()
    });

    sendTokenResponse(user, 200, res);

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.',
      sustainabilityMessage: 'We encountered an issue accessing your environmental profile. Please try again!'
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  try {
    // User is available from auth middleware
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          green_points: user.green_points,
          sustainability_level: user.sustainability_level,
          waste_reports_submitted: user.waste_reports_submitted,
          reports_verified: user.reports_verified,
          cleanup_events_attended: user.cleanup_events_attended,
          recycling_sessions_logged: user.recycling_sessions_logged,
          bio: user.bio,
          location: user.location,
          sustainability_interests: user.sustainability_interests,
          achievements: user.achievements,
          is_verified: user.is_verified,
          privacy_settings: user.privacy_settings,
          created_at: user.createdAt,
          last_login: user.last_login
        }
      },
      sustainabilityMessage: `Welcome back, ${user.name}! Your environmental impact continues to grow.`
    });

  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving user profile'
    });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
  try {
    // Clear the token cookie
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'User logged out successfully',
      sustainabilityMessage: 'Thank you for your environmental contributions today! Keep making a green impact!'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout'
    });
  }
};

// @desc    Forgot password (send reset token)
// @route   POST /api/v1/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email address'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email address',
        sustainabilityMessage: 'Email not found. Join our environmental community by registering!'
      });
    }

    // Generate reset token (implementation depends on your reset strategy)
    // This is a placeholder - you'd typically generate a secure token and send email
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET + user.password, // Include password in secret for security
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Password reset instructions sent',
      sustainabilityMessage: 'Check your email for password reset instructions to continue your environmental journey!',
      // In production, don't send the token in response - send via email
      resetToken: resetToken // Remove this in production
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing password reset request'
    });
  }
};

// @desc    Reset password with token
// @route   PUT /api/v1/auth/reset-password/:resettoken
// @access  Public
exports.resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { resettoken } = req.params;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide new password'
      });
    }

    // Verify reset token (implementation depends on your token strategy)
    // This is a placeholder implementation
    let decoded;
    try {
      // Note: In production, you'd need to get the user first to verify the token
      decoded = jwt.verify(resettoken, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    // Find user and reset password
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset token'
      });
    }

    // Set new password (will be hashed by pre-save middleware)
    user.password = password;
    user.password_reset_token = undefined;
    user.password_reset_expires = undefined;
    await user.save();

    console.log(`🔑 Password reset successful for user:`, {
      name: user.name,
      email: user.email,
      timestamp: new Date().toISOString()
    });

    sendTokenResponse(user, 200, res);

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error resetting password'
    });
  }
};

module.exports = {
  register: exports.register,
  login: exports.login,
  getMe: exports.getMe,
  logout: exports.logout,
  forgotPassword: exports.forgotPassword,
  resetPassword: exports.resetPassword
};