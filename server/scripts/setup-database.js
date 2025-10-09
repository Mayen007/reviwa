const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import models
const User = require('../models/User');

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('🌱 Connecting to Reviwa Sustainability Platform Database...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully');

    // Clear existing data (optional - comment out for production)
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    console.log('✅ Database cleared');

    // Create sample environmental users
    console.log('🌍 Creating sample environmental users...');

    const sampleUsers = [
      {
        name: 'Eco Champion Sarah',
        email: 'sarah@example.com',
        password: 'EcoPass123!',
        role: 'user',
        bio: 'Passionate about urban sustainability and waste reduction',
        green_points: 150,
        waste_reports_submitted: 12,
        cleanup_events_attended: 5,
        recycling_sessions_logged: 8,
        sustainability_interests: ['waste_reduction', 'recycling', 'urban_gardening'],
        location: {
          city: 'San Francisco',
          state: 'California',
          coordinates: {
            type: 'Point',
            coordinates: [-122.4194, 37.7749] // [longitude, latitude]
          }
        },
        achievements: [
          {
            title: 'First Report',
            description: 'Successfully submitted your first waste report',
            category: 'waste_reporting',
            green_points_earned: 10,
            icon: '🗑️'
          },
          {
            title: 'Cleanup Hero',
            description: 'Attended 5 community cleanup events',
            category: 'cleanup_participation',
            green_points_earned: 25,
            icon: '🧹'
          }
        ]
      },
      {
        name: 'Green Solutions NGO',
        email: 'contact@greensolutions.org',
        password: 'GreenOrg123!',
        role: 'environmental_org',
        bio: 'Community organization focused on sustainable waste management and environmental education',
        green_points: 500,
        waste_reports_submitted: 8,
        cleanup_events_attended: 15,
        recycling_sessions_logged: 0,
        sustainability_interests: ['waste_reduction', 'clean_energy', 'water_conservation'],
        location: {
          city: 'Portland',
          state: 'Oregon',
          coordinates: {
            type: 'Point',
            coordinates: [-122.6750, 45.5152]
          }
        },
        achievements: [
          {
            title: 'Community Leader',
            description: 'Organized multiple environmental events',
            category: 'sustainability_champion',
            green_points_earned: 100,
            icon: '🌟'
          }
        ]
      },
      {
        name: 'Sustainability Admin',
        email: 'admin@reviwa.com',
        password: 'AdminPass123!',
        role: 'admin',
        bio: 'Platform administrator focused on environmental data management and AI insights',
        green_points: 1000,
        waste_reports_submitted: 5,
        cleanup_events_attended: 3,
        recycling_sessions_logged: 2,
        sustainability_interests: ['air_quality', 'waste_reduction', 'clean_energy'],
        location: {
          city: 'Austin',
          state: 'Texas',
          coordinates: {
            type: 'Point',
            coordinates: [-97.7431, 30.2672]
          }
        }
      }
    ];

    // Hash passwords and create users
    for (let userData of sampleUsers) {
      const salt = await bcrypt.genSalt(12);
      userData.password = await bcrypt.hash(userData.password, salt);

      const user = await User.create(userData);
      console.log(`✅ Created ${user.role}: ${user.name} (${user.email})`);
    }

    // Test geospatial indexing
    console.log('🗺️ Testing geospatial indexing...');
    const nearbyUsers = await User.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [-122.4194, 37.7749] // San Francisco coordinates
          },
          $maxDistance: 100000 // 100km radius
        }
      }
    });
    console.log(`✅ Found ${nearbyUsers.length} users within 100km of San Francisco`);

    // Test sustainability features
    console.log('🌱 Testing sustainability features...');
    const topUsers = await User.getLeaderboard(5);
    console.log(`✅ Leaderboard query successful - ${topUsers.length} top users retrieved`);

    // Verify environmental indexes
    console.log('📊 Verifying database indexes...');
    const indexes = await User.collection.indexes();
    console.log('✅ Database indexes:', indexes.map(idx => idx.key));

    console.log('\n🎉 Database setup completed successfully!');
    console.log('🌍 Reviwa Sustainability Platform is ready for environmental impact tracking');
    console.log('\n📋 Sample Users Created:');
    console.log('👤 User: sarah@example.com / EcoPass123!');
    console.log('🏢 Environmental Org: contact@greensolutions.org / GreenOrg123!');
    console.log('👨‍💼 Admin: admin@reviwa.com / AdminPass123!');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run setup if script is called directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;