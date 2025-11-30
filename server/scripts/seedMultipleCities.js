import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

import Report from '../models/Report.model.js';
import User from '../models/User.model.js';

// Alternative locations - Nairobi, Kenya
const nairobiLocations = [
  // CBD & Surrounding
  { lat: -1.2864, lng: 36.8172, address: 'Kenyatta Avenue, CBD' },
  { lat: -1.2921, lng: 36.8219, address: 'River Road Market' },
  { lat: -1.2795, lng: 36.8148, address: 'Uhuru Park Area' },

  // Eastlands
  { lat: -1.2740, lng: 36.8861, address: 'Eastleigh, Section 1' },
  { lat: -1.2589, lng: 36.8934, address: 'Huruma Estate' },
  { lat: -1.2921, lng: 36.8965, address: 'Mathare Valley' },

  // Westlands & Parklands
  { lat: -1.2675, lng: 36.8027, address: 'Westlands Shopping District' },
  { lat: -1.2549, lng: 36.8159, address: 'Parklands Market' },

  // South
  { lat: -1.3234, lng: 36.8847, address: 'Mukuru Slums' },
  { lat: -1.3167, lng: 36.8231, address: 'Industrial Area' },
  { lat: -1.3421, lng: 36.7845, address: 'Karen Shopping Center' },

  // North
  { lat: -1.2187, lng: 36.8867, address: 'Kasarani Stadium Area' },
  { lat: -1.1983, lng: 36.8523, address: 'Githurai 45' },
  { lat: -1.2342, lng: 36.7912, address: 'Kikuyu Town' },

  // Misc
  { lat: -1.3045, lng: 36.7234, address: 'Ngong Road' }
];

// Alternative locations - Lagos, Nigeria
const lagosLocations = [
  // Lagos Island
  { lat: 6.4541, lng: 3.3947, address: 'Marina, Lagos Island' },
  { lat: 6.4582, lng: 3.3841, address: 'Idumota Market' },

  // Mainland
  { lat: 6.5244, lng: 3.3792, address: 'Yaba Market' },
  { lat: 6.5568, lng: 3.3488, address: 'Oshodi Transport Hub' },
  { lat: 6.6018, lng: 3.3515, address: 'Ikeja GRA' },

  // Victoria Island
  { lat: 6.4298, lng: 3.4219, address: 'Victoria Island Shopping' },
  { lat: 6.4474, lng: 3.4701, address: 'Lekki Phase 1' },

  // Surulere
  { lat: 6.4969, lng: 3.3534, address: 'Surulere Stadium Area' },
  { lat: 6.5087, lng: 3.3646, address: 'Ojuelegba' },

  // Apapa
  { lat: 6.4489, lng: 3.3598, address: 'Apapa Port Area' },

  // Ikorodu
  { lat: 6.6194, lng: 3.5087, address: 'Ikorodu Town Center' },

  // Badagry
  { lat: 6.4141, lng: 2.8877, address: 'Badagry Road' },

  // Epe
  { lat: 6.5833, lng: 3.9833, address: 'Epe Town' },

  // Agege
  { lat: 6.6167, lng: 3.3167, address: 'Agege Motor Road' },

  // Ajah
  { lat: 6.4674, lng: 3.5667, address: 'Ajah Roundabout' }
];

// Choose your city (uncomment the one you want)
const CITY = 'kampala'; // Options: 'kampala', 'nairobi', 'lagos'

const locationsByCity = {
  kampala: [
    { lat: 0.3476, lng: 32.5825, address: 'Kampala Road, Central Division' },
    { lat: 0.3136, lng: 32.5811, address: 'Nakasero Market Area' },
    { lat: 0.3163, lng: 32.5822, address: 'Nakivubo Channel, Industrial Area' },
    { lat: 0.2897, lng: 32.6013, address: 'Ggaba Road, Makindye' },
    { lat: 0.2945, lng: 32.5847, address: 'Tank Hill, Muyenga' },
    { lat: 0.3723, lng: 32.5645, address: 'Bwaise II, Kawempe' },
    { lat: 0.3842, lng: 32.5583, address: 'Kalerwe Market' },
    { lat: 0.3371, lng: 32.6182, address: 'Kireka, Nakawa' },
    { lat: 0.3289, lng: 32.6241, address: 'Banda Hill' },
    { lat: 0.3024, lng: 32.5498, address: 'Mengo, Rubaga' },
    { lat: 0.2978, lng: 32.5523, address: 'Namirembe Road' },
    { lat: 0.3567, lng: 32.6523, address: 'Ntinda Shopping Complex' },
    { lat: 0.2756, lng: 32.6134, address: 'Bunga, Ggaba' },
    { lat: 0.3945, lng: 32.5234, address: 'Nansana Town' },
    { lat: 0.2623, lng: 32.5912, address: 'Munyonyo' },
  ],
  nairobi: nairobiLocations,
  lagos: lagosLocations
};

const dummyLocations = locationsByCity[CITY];

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

    // Get a user to assign as reporter
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

    console.log(`\n🌍 Creating ${dummyLocations.length} dummy reports for ${CITY.toUpperCase()}...`);

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
        images: [],
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      };

      reports.push(report);
    }

    const createdReports = await Report.insertMany(reports);

    console.log(`✅ Successfully created ${createdReports.length} dummy reports!`);
    console.log('\n📊 Report Summary:');

    const statusCounts = {};
    createdReports.forEach(report => {
      statusCounts[report.status] = (statusCounts[report.status] || 0) + 1;
    });

    console.log('\nBy Status:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`);
    });

    const wasteTypeCounts = {};
    createdReports.forEach(report => {
      wasteTypeCounts[report.wasteType] = (wasteTypeCounts[report.wasteType] || 0) + 1;
    });

    console.log('\nBy Waste Type:');
    Object.entries(wasteTypeCounts).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    console.log('\n🗺️  You can now view these reports on the map!');
    console.log(`📍 City: ${CITY.toUpperCase()}`);
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

seedReports();
