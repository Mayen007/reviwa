import './env.js'; // Load environment variables first
import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI;
  const fallbackUri =
    process.env.NODE_ENV !== 'production'
      ? 'mongodb://127.0.0.1:27017/reviwa-v2'
      : null;

  const connectionTargets = [primaryUri, fallbackUri].filter(Boolean);
  let lastError = null;

  for (const uri of connectionTargets) {
    try {
      const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000
      });

      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

      if (uri !== primaryUri) {
        console.warn('⚠️ Using local MongoDB fallback for development');
      }

      return conn;
    } catch (error) {
      lastError = error;
      console.warn(`❌ MongoDB connection failed for ${uri}: ${error.message}`);
    }
  }

  console.error(`❌ MongoDB Connection Error: ${lastError?.message || 'Unknown error'}`);

  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }

  throw lastError;
};

export default connectDB;
