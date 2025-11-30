import mongoose from 'mongoose';
import User from '../models/User.model.js';
import { MONGODB_URI } from '../config/env.js';

/**
 * Script to make a user an admin
 * Usage: node scripts/makeAdmin.js <email>
 * Example: node scripts/makeAdmin.js john@example.com
 */

const makeAdmin = async (email) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    if (!email) {
      console.log('\n📋 Usage: node scripts/makeAdmin.js <email>');
      console.log('Example: node scripts/makeAdmin.js john@example.com\n');

      // List all users
      const users = await User.find({}).select('email name role');
      console.log('📋 Available users:');
      users.forEach(user => {
        const roleIcon = user.role === 'admin' ? '👑' : '👤';
        console.log(`  ${roleIcon} ${user.email} (${user.name}) - Role: ${user.role}`);
      });

      process.exit(0);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`❌ User with email "${email}" not found`);
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`ℹ️  User "${user.name}" (${user.email}) is already an admin`);
      process.exit(0);
    }

    // Update user role to admin
    user.role = 'admin';
    await user.save();

    console.log(`✅ Successfully made "${user.name}" (${user.email}) an admin!`);
    console.log(`   Previous role: user → New role: admin`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

// Get email from command line arguments
const email = process.argv[2];
makeAdmin(email);
