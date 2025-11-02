import User from '../models/User.model.js';

/**
 * @desc    Get user profile
 * @route   GET /api/users/:id
 * @access  Public
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update user profile
 * @route   PATCH /api/users/:id
 * @access  Private
 */
export const updateUserProfile = async (req, res, next) => {
  try {
    // Only allow user to update their own profile
    if (req.params.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    const { name, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get leaderboard (top users by eco points)
 * @route   GET /api/users/leaderboard
 * @access  Public
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const users = await User.find()
      .select('name email avatar ecoPoints reportsCount')
      .sort({ ecoPoints: -1 })
      .limit(limit);

    res.json({
      success: true,
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};
