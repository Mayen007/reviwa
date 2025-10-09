require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const testLogin = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test if users exist
    const users = await User.find({}, 'name email role');
    console.log('\n📋 Users in database:');
    users.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
    });

    // Test login for Sarah
    console.log('\n🔐 Testing login for sarah@example.com...');
    const sarah = await User.findOne({ email: 'sarah@example.com' }).select('+password');

    if (!sarah) {
      console.log('❌ User not found');
      return;
    }

    console.log(`✅ User found: ${sarah.name}`);

    // Show hashed password
    console.log(`🔐 Stored password hash: ${sarah.password}`);
    console.log(`📏 Hash length: ${sarah.password.length}`);

    // Test manual hashing
    const bcrypt = require('bcryptjs');
    const testPassword = 'EcoPass123!';
    console.log(`\n🔨 Manually hashing "${testPassword}"...`);
    const salt = await bcrypt.genSalt(12);
    const hashedTest = await bcrypt.hash(testPassword, salt);
    console.log(`🔐 Manual hash: ${hashedTest}`);

    // Test if hash is valid bcrypt hash
    const isValidHash = sarah.password.startsWith('$2b$') && sarah.password.length === 60;
    console.log(`🔍 Is valid bcrypt hash: ${isValidHash}`);

    // Test direct comparison
    const directMatch = await bcrypt.compare(testPassword, sarah.password);
    console.log(`🔍 Direct bcrypt compare result: ${directMatch}`);

    // Let's also test if the hash was created with a different password
    const testPasswords2 = ['EcoPass123!', 'password123', '', 'test'];
    for (const testPass of testPasswords2) {
      const match = await bcrypt.compare(testPass, sarah.password);
      if (match) {
        console.log(`🎯 FOUND MATCHING PASSWORD: "${testPass}"`);
      }
    }

    // Test password match method
    const testPasswords = ['password123', 'EcoPass123!'];

    for (const password of testPasswords) {
      console.log(`\n🔍 Testing password: "${password}"`);
      const isMatch = await sarah.matchPassword(password);
      console.log(isMatch ? '✅ Password matches!' : '❌ Password does not match');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
};

testLogin();