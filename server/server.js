const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import middleware
const errorHandler = require('./middleware/errorHandler');
const authMiddleware = require('./middleware/auth');

// Import routes
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // For image uploads
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Reviwa AI-Powered Sustainability Platform API Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    platform: 'environmental_sustainability',
    aiPowered: true,
    sdgAlignment: ['SDG-11', 'SDG-13'],
    features: ['waste_reporting', 'environmental_data', 'ai_insights', 'cleanup_coordination']
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/reports', reportRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/events', eventRoutes);

// Public data endpoints (no auth required)
app.get('/api/v1/public/stats', async (req, res) => {
  try {
    // This will be implemented with actual models later
    const stats = {
      totalWasteReports: 0,
      resolvedWasteIssues: 0,
      activeEnvironmentalUsers: 0,
      cleanupEvents: 0,
      greenPointsAwarded: 0,
      co2ReductionEstimate: 0,
      recyclingSessionsLogged: 0,
      aiInsightsGenerated: 0
    };

    res.json({
      success: true,
      data: stats,
      isPublic: true,
      message: 'Public environmental impact statistics',
      platform: 'AI-powered sustainability platform'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching public statistics'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedPath: req.originalUrl,
    availableRoutes: [
      'GET /api/health',
      'POST /api/v1/auth/register',
      'POST /api/v1/auth/login',
      'GET /api/v1/public/stats'
    ]
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Database connection
const connectDB = require('./config/database');

// Initialize server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log('� Reviwa AI-Powered Sustainability Platform Started');
      console.log(`🔗 Server: http://localhost:${PORT}`);
      console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
      console.log(`📊 Environmental Stats: http://localhost:${PORT}/api/v1/public/stats`);
      console.log('� Ready for environmental impact and smart city solutions!');
      console.log('🤖 AI-powered waste management and sustainability insights enabled');
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();

module.exports = app;