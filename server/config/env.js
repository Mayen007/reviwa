import dotenv from 'dotenv';

// Load environment variables as early as possible
dotenv.config();

// Log for debugging
console.log('Environment loaded:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL ? 'SET ✓' : 'NOT SET ✗'
});

export default process.env;
