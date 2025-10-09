require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const minimalTest = async () => {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clean up first
    await User.deleteOne({ email: 'test@example.com' });

    // Create a very minimal user
    console.log('\n🔨 Creating minimal user...');
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'simplepass',
      role: 'user',
      location: {
        city: 'Test City',
        state: 'Test State',
        coordinates: {
          type: 'Point',
          coordinates: [-122.4194, 37.7749] // San Francisco
        }
      }
    };

    const user = await User.create(userData);
    console.log('✅ User created');

    // Test password immediately
    console.log('\n🔍 Testing password...');
    const isMatch = await user.matchPassword('simplepass');
    console.log(`Result: ${isMatch ? '✅ MATCH' : '❌ NO MATCH'}`);

    if (isMatch) {
      console.log('🎉 SUCCESS! Password hashing and comparison works!');

      // Now test with the actual credentials from setup
      console.log('\n🔄 Testing with API endpoint credentials...');
      await User.deleteOne({ email: 'api-test@example.com' });

      const apiUser = await User.create({
        name: 'API Test User',
        email: 'api-test@example.com',
        password: 'EcoPass123!',
        role: 'user',
        location: {
          city: 'API City',
          state: 'API State',
          coordinates: {
            type: 'Point',
            coordinates: [-122.4194, 37.7749]
          }
        }
      });

      const apiMatch = await apiUser.matchPassword('EcoPass123!');
      console.log(`API user password test: ${apiMatch ? '✅ MATCH' : '❌ NO MATCH'}`);

      if (apiMatch) {
        console.log('🌟 Perfect! Let\'s test the actual login endpoint...');

        // Test with PowerShell command format
        console.log('\n📋 Test this in PowerShell:');
        console.log('$body = @{ email = "api-test@example.com"; password = "EcoPass123!" } | ConvertTo-Json');
        console.log('Invoke-RestMethod -Uri "http://localhost:5000/api/v1/auth/login" -Method POST -Body $body -ContentType "application/json"');
      }
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
};

minimalTest();