const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🌱 MongoDB Connected Successfully to Reviwa Sustainability Platform');
    console.log(`🗄️ Database Host: ${conn.connection.host}`);
    console.log(`🏛️ Database Name: ${conn.connection.name}`);
    console.log('� Ready for environmental data management and AI-powered insights!');

    // Connection event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected - environmental data temporarily unavailable');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected - environmental data services restored');
    });

  } catch (error) {
    console.error('❌ Environmental database connection failed:', error.message);
    console.error('🔧 Check your MONGODB_URI in .env file');
    console.error('🌱 Sustainability platform requires database connection for environmental data');
    process.exit(1);
  }
};

module.exports = connectDB;