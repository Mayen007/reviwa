const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  // Basic user information
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },

  // Environmental platform role system
  role: {
    type: String,
    enum: ['user', 'environmental_org', 'admin'],
    default: 'user',
    required: true
  },

  // Environmental impact metrics
  green_points: {
    type: Number,
    default: 0,
    min: [0, 'Green points cannot be negative']
  },  // Environmental engagement tracking
  waste_reports_submitted: {
    type: Number,
    default: 0
  },
  reports_verified: {
    type: Number,
    default: 0
  },
  cleanup_events_attended: {
    type: Number,
    default: 0
  },
  recycling_sessions_logged: {
    type: Number,
    default: 0
  },

  // Environmental profile information
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters'],
    trim: true
  },

  // Environmental preferences
  sustainability_interests: [{
    type: String,
    enum: ['waste_reduction', 'recycling', 'urban_gardening', 'clean_energy', 'water_conservation', 'air_quality']
  }],
  location: {
    city: String,
    state: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere' // Geospatial indexing for location-based features
      }
    }
  },

  // Privacy and notification preferences
  privacy_settings: {
    show_on_leaderboard: {
      type: Boolean,
      default: true
    },
    public_profile: {
      type: Boolean,
      default: true
    },
    show_location: {
      type: Boolean,
      default: false
    }
  },

  notification_preferences: {
    email_waste_alerts: {
      type: Boolean,
      default: true
    },
    email_cleanup_events: {
      type: Boolean,
      default: true
    },
    ai_insights_notifications: {
      type: Boolean,
      default: true
    },
    sustainability_tips: {
      type: Boolean,
      default: true
    }
  },

  // Account status and verification
  is_verified: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },

  // Environmental achievements and recognition
  achievements: [{
    title: String,
    description: String,
    icon: String,
    category: {
      type: String,
      enum: ['waste_reporting', 'recycling', 'cleanup_participation', 'ai_insights', 'sustainability_champion']
    },
    green_points_earned: Number,
    earned_date: {
      type: Date,
      default: Date.now
    }
  }],

  // Account management
  last_login: Date,
  password_reset_token: String,
  password_reset_expires: Date,
  email_verification_token: String,
  email_verification_expires: Date

}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance and environmental features
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ green_points: -1 }); // For sustainability leaderboards
UserSchema.index({ 'location.coordinates': '2dsphere' }); // Geospatial queries for waste reporting
UserSchema.index({ sustainability_interests: 1 }); // For AI-powered recommendations
UserSchema.index({ createdAt: -1 });

// Virtual for environmental engagement level
UserSchema.virtual('sustainability_level').get(function () {
  const totalActivity = this.waste_reports_submitted + this.cleanup_events_attended + this.recycling_sessions_logged;
  if (totalActivity >= 50) return 'Eco Champion';
  if (totalActivity >= 20) return 'Green Advocate';
  if (totalActivity >= 5) return 'Sustainability Contributor';
  return 'Green Newcomer';
});

// Pre-save middleware to hash password
UserSchema.pre('save', async function (next) {
  // Only hash password if it has been modified
  if (!this.isModified('password')) {
    next();
  }

  // Hash password with cost of 12
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to check password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to generate JWT token
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
      name: this.name,
      green_points: this.green_points
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    }
  );
};

// Instance method to update environmental impact metrics
UserSchema.methods.addGreenPoints = function (points, activity_type) {
  this.green_points += points;

  // Update activity counters based on environmental activity type
  switch (activity_type) {
    case 'waste_report_submitted':
      this.waste_reports_submitted += 1;
      break;
    case 'report_verified':
      this.reports_verified += 1;
      break;
    case 'cleanup_event_attended':
      this.cleanup_events_attended += 1;
      break;
    case 'recycling_logged':
      this.recycling_sessions_logged += 1;
      break;
    case 'welcome_bonus':
      // No counter update for welcome bonus
      break;
  }

  return this.save();
};

// Static method to get leaderboard
UserSchema.statics.getLeaderboard = function (limit = 10, timeframe = 'all') {
  const query = { is_active: true, 'privacy_settings.show_on_leaderboard': true };

  // Add time filtering if needed
  if (timeframe !== 'all') {
    const date = new Date();
    switch (timeframe) {
      case 'monthly':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() - 1);
        break;
    }
    query.createdAt = { $gte: date };
  }

  return this.find(query)
    .select('name green_points waste_reports_submitted cleanup_events_attended recycling_sessions_logged sustainability_level')
    .sort({ green_points: -1 })
    .limit(limit);
};

module.exports = mongoose.model('User', UserSchema);