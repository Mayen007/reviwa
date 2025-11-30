import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

import Report from '../models/Report.model.js';
import User from '../models/User.model.js';

// Dummy locations across different cities (you can customize these)
// Using Kampala, Uganda as an example - change to your preferred city
const dummyLocations = [
  // Central Kampala
  { lat: 0.3476, lng: 32.5825, address: 'Kampala Road, Central Division' },
  { lat: 0.3136, lng: 32.5811, address: 'Nakasero Market Area' },
  { lat: 0.3163, lng: 32.5822, address: 'Nakivubo Channel, Industrial Area' },

  // Makindye Division
  { lat: 0.2897, lng: 32.6013, address: 'Ggaba Road, Makindye' },
  { lat: 0.2945, lng: 32.5847, address: 'Tank Hill, Muyenga' },

  // Kawempe Division
  { lat: 0.3723, lng: 32.5645, address: 'Bwaise II, Kawempe' },
  { lat: 0.3842, lng: 32.5583, address: 'Kalerwe Market' },

  // Nakawa Division
  { lat: 0.3371, lng: 32.6182, address: 'Kireka, Nakawa' },
  { lat: 0.3289, lng: 32.6241, address: 'Banda Hill' },

  // Rubaga Division
  { lat: 0.3024, lng: 32.5498, address: 'Mengo, Rubaga' },
  { lat: 0.2978, lng: 32.5523, address: 'Namirembe Road' },

  // Outer areas
  { lat: 0.3567, lng: 32.6523, address: 'Ntinda Shopping Complex' },
  { lat: 0.2756, lng: 32.6134, address: 'Bunga, Ggaba' },
  { lat: 0.3945, lng: 32.5234, address: 'Nansana Town' },
  { lat: 0.2623, lng: 32.5912, address: 'Munyonyo' },
];

const wasteTypes = ['plastic', 'organic', 'metal', 'glass', 'electronic', 'mixed'];
const severities = ['low', 'medium', 'high', 'critical'];
const statuses = ['pending', 'verified', 'in-progress', 'resolved'];

const reportTitles = [
  'Illegal Dumping Site',
  'Overflowing Garbage Bins',
  'Plastic Waste Accumulation',
  'Electronic Waste Disposal',
  'Construction Debris',
  'Market Waste Overflow',
  'Roadside Trash Pile',
  'Blocked Drainage with Waste',
  'Abandoned Vehicle Parts',
  'Medical Waste Concern',
  'Burning Waste Site',
  'Industrial Waste Leak',
  'River Pollution',
  'Street Vendor Waste',
  'School Compound Waste'
];

const reportDescriptions = [
  'Large pile of mixed waste dumped illegally. Needs immediate cleanup.',
  'Community bins overflowing for several days. Attracting pests.',
  'Significant accumulation of plastic bottles and bags in the area.',
  'Old electronics and appliances dumped near residential area.',
  'Construction materials and debris left on public land.',
  'Market waste not collected properly, creating health hazard.',
  'Multiple trash bags left on roadside for extended period.',
  'Waste blocking drainage system, causing flooding risk.',
  'Abandoned vehicle parts and scrap metal scattered.',
  'Medical waste found outside healthcare facility perimeter.',
  'Active burning of waste creating air pollution.',
  'Chemical or industrial waste leaking into environment.',
  'Plastic and waste materials polluting water source.',
  'Waste from street vendors accumulating without collection.',
  'School waste bins not maintained, affecting student health.'
];

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function seedReports() {
  try {
    await connectDB();

    // Get a user to assign as reporter (use first user or create test user)
    let testUser = await User.findOne({ email: 'test@reviwa.com' });

    if (!testUser) {
      console.log('Creating test user...');
      testUser = await User.create({
        name: 'Test Reporter',
        email: 'test@reviwa.com',
        password: 'password123',
        role: 'user'
      });
      console.log('✅ Test user created');
    }

    // Clear existing reports (optional - comment out if you want to keep existing reports)
    // await Report.deleteMany({});
    // console.log('Cleared existing reports');

    console.log(`\n🌍 Creating ${dummyLocations.length} dummy reports...`);

    const reports = [];

    for (let i = 0; i < dummyLocations.length; i++) {
      const location = dummyLocations[i];
      const titleIndex = Math.floor(Math.random() * reportTitles.length);
      const descIndex = Math.floor(Math.random() * reportDescriptions.length);

      const report = {
        title: reportTitles[titleIndex],
        description: reportDescriptions[descIndex],
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat], // [longitude, latitude]
          address: location.address
        },
        wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        reportedBy: testUser._id,
        images: [], // No images for dummy data
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date within last 30 days
      };

      reports.push(report);
    }

    const createdReports = await Report.insertMany(reports);

    console.log(`✅ Successfully created ${createdReports.length} dummy reports!`);
    console.log('\n📊 Report Summary:');

    // Count by status
    const statusCounts = {};
    createdReports.forEach(report => {
      statusCounts[report.status] = (statusCounts[report.status] || 0) + 1;
    });

    console.log('\nBy Status:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });

    // Count by waste type
    const wasteTypeCounts = {};
    createdReports.forEach(report => {
      wasteTypeCounts[report.wasteType] = (wasteTypeCounts[report.wasteType] || 0) + 1;
    });

    console.log('\nBy Waste Type:');
    Object.entries(wasteTypeCounts).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    console.log('\n🗺️  You can now view these reports on the map!');
    console.log('🌐 Coordinates range:');
    console.log(`  Latitude: ${Math.min(...dummyLocations.map(l => l.lat)).toFixed(4)} to ${Math.max(...dummyLocations.map(l => l.lat)).toFixed(4)}`);
    console.log(`  Longitude: ${Math.min(...dummyLocations.map(l => l.lng)).toFixed(4)} to ${Math.max(...dummyLocations.map(l => l.lng)).toFixed(4)}`);

  } catch (error) {
    console.error('❌ Error seeding reports:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

// Run the seeder
seedReports();
