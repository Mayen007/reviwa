import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

import Report from '../models/Report.model.js';
import User from '../models/User.model.js';

// Dummy locations across different cities (you can customize these)
// Using Nairobi, Kenya
const dummyLocations = [
  // Central Nairobi
  { lat: -1.2841, lng: 36.8219, address: 'Kenyatta Avenue, CBD' },
  { lat: -1.2833, lng: 36.8283, address: 'Gikomba Market Area' },
  { lat: -1.2911, lng: 36.8460, address: 'Industrial Area' },

  // Langata / Karen
  { lat: -1.3133, lng: 36.7820, address: 'Kibera, Langata' },
  { lat: -1.3197, lng: 36.7076, address: 'Karen' },

  // Kasarani / Roysambu
  { lat: -1.2270, lng: 36.8974, address: 'Kasarani' },
  { lat: -1.2167, lng: 36.8833, address: 'Roysambu' },

  // Embakasi / Eastlands
  { lat: -1.3230, lng: 36.8950, address: 'Embakasi' },
  { lat: -1.2833, lng: 36.8917, address: 'Umoja' },

  // Dagoretti / Westlands
  { lat: -1.3006, lng: 36.7513, address: 'Dagoretti' },
  { lat: -1.2648, lng: 36.8065, address: 'Westlands' },

  // Outer areas
  { lat: -1.2757, lng: 36.8442, address: 'Eastleigh' },
  { lat: -1.2833, lng: 36.8667, address: 'Buruburu' },
  { lat: -1.3167, lng: 36.8333, address: 'South B' },
  { lat: -1.2977, lng: 36.7481, address: 'Kawangware' },
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
