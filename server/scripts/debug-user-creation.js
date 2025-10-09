require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const debugUserCreation = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete the existing Sarah user
    await User.deleteOne({ email: 'sarah@example.com' });
    console.log('🗑️ Deleted existing Sarah user');

    // Create a new user with the same data
    console.log('\n🔨 Creating new user...');
    const userData = {
      name: 'Test User Sarah',
      email: 'sarah@example.com',
      password: 'EcoPass123!',
      role: 'user'
    };

    console.log('📝 User data before save:', {
      ...userData,
      password: '***hidden***'
    });

    const user = new User(userData);

    // Log the password before save
    console.log(`🔐 Password before save: ${user.password}`);

    await user.save();

    // Log the password after save (should be hashed)
    console.log(`🔐 Password after save: ${user.password}`);

    // Test password match
    console.log('\n🔍 Testing password match...');
    const isMatch = await user.matchPassword('EcoPass123!');
    console.log(`Result: ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);

    // Test with wrong password
    const wrongMatch = await user.matchPassword('wrongpassword');
    console.log(`Wrong password test: ${wrongMatch ? '❌ SHOULD NOT MATCH' : '✅ Correctly rejected'}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
};

debugUserCreation();