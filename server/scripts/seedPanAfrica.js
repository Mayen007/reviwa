import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

import Report from '../models/Report.model.js';
import User from '../models/User.model.js';

// DIVERSE AFRICAN CITIES - Major cities across different regions
const africanCities = {
  // East Africa
  kampala: {
    name: 'Kampala, Uganda',
    locations: [
      { lat: 0.3476, lng: 32.5825, address: 'Kampala Road, Central Division' },
      { lat: 0.3136, lng: 32.5811, address: 'Nakasero Market Area' },
      { lat: 0.2897, lng: 32.6013, address: 'Ggaba Road, Makindye' },
      { lat: 0.3723, lng: 32.5645, address: 'Bwaise II, Kawempe' },
      { lat: 0.3371, lng: 32.6182, address: 'Kireka, Nakawa' },
    ]
  },
  nairobi: {
    name: 'Nairobi, Kenya',
    locations: [
      { lat: -1.2864, lng: 36.8172, address: 'Kenyatta Avenue, CBD' },
      { lat: -1.2921, lng: 36.8219, address: 'River Road Market' },
      { lat: -1.2740, lng: 36.8861, address: 'Eastleigh, Section 1' },
      { lat: -1.2675, lng: 36.8027, address: 'Westlands Shopping District' },
      { lat: -1.3234, lng: 36.8847, address: 'Mukuru Slums' },
    ]
  },
  daressalaam: {
    name: 'Dar es Salaam, Tanzania',
    locations: [
      { lat: -6.8160, lng: 39.2803, address: 'Kariakoo Market Area' },
      { lat: -6.7924, lng: 39.2083, address: 'Kinondoni District' },
      { lat: -6.8235, lng: 39.2695, address: 'Ilala Municipal' },
      { lat: -6.7644, lng: 39.2466, address: 'Oyster Bay' },
      { lat: -6.8764, lng: 39.2679, address: 'Temeke Municipal' },
    ]
  },
  kigali: {
    name: 'Kigali, Rwanda',
    locations: [
      { lat: -1.9536, lng: 30.0605, address: 'City Center, Kigali' },
      { lat: -1.9441, lng: 30.0619, address: 'Nyarugenge District' },
      { lat: -1.9706, lng: 30.1044, address: 'Kimironko Market' },
      { lat: -1.9355, lng: 30.1279, address: 'Kacyiru, Gasabo' },
    ]
  },
  addisababa: {
    name: 'Addis Ababa, Ethiopia',
    locations: [
      { lat: 9.0054, lng: 38.7636, address: 'Meskel Square' },
      { lat: 9.0320, lng: 38.7469, address: 'Merkato Market' },
      { lat: 9.0124, lng: 38.7984, address: 'Bole Area' },
      { lat: 8.9806, lng: 38.7578, address: 'Addis Ketema' },
    ]
  },

  // West Africa
  lagos: {
    name: 'Lagos, Nigeria',
    locations: [
      { lat: 6.4541, lng: 3.3947, address: 'Marina, Lagos Island' },
      { lat: 6.5244, lng: 3.3792, address: 'Yaba Market' },
      { lat: 6.5568, lng: 3.3488, address: 'Oshodi Transport Hub' },
      { lat: 6.4298, lng: 3.4219, address: 'Victoria Island' },
      { lat: 6.4969, lng: 3.3534, address: 'Surulere Stadium Area' },
    ]
  },
  accra: {
    name: 'Accra, Ghana',
    locations: [
      { lat: 5.6037, lng: -0.1870, address: 'Makola Market, Central' },
      { lat: 5.6145, lng: -0.2058, address: 'Kantamanto Market' },
      { lat: 5.5893, lng: -0.2320, address: 'Dansoman Estate' },
      { lat: 5.6561, lng: -0.1611, address: 'East Legon' },
      { lat: 5.5720, lng: -0.1978, address: 'Jamestown' },
    ]
  },
  abidjan: {
    name: 'Abidjan, Côte d\'Ivoire',
    locations: [
      { lat: 5.3364, lng: -4.0267, address: 'Plateau District' },
      { lat: 5.3599, lng: -3.9866, address: 'Adjamé Market' },
      { lat: 5.3599, lng: -4.0083, address: 'Cocody' },
      { lat: 5.2893, lng: -3.9753, address: 'Yopougon' },
    ]
  },
  dakar: {
    name: 'Dakar, Senegal',
    locations: [
      { lat: 14.6928, lng: -17.4467, address: 'Plateau, Central Dakar' },
      { lat: 14.7319, lng: -17.4572, address: 'Medina Market' },
      { lat: 14.7167, lng: -17.4677, address: 'Sandaga Market' },
      { lat: 14.7644, lng: -17.3841, address: 'Parcelles Assainies' },
    ]
  },

  // North Africa
  cairo: {
    name: 'Cairo, Egypt',
    locations: [
      { lat: 30.0444, lng: 31.2357, address: 'Tahrir Square' },
      { lat: 30.0626, lng: 31.2497, address: 'Shubra District' },
      { lat: 30.0131, lng: 31.2089, address: 'Giza District' },
      { lat: 30.0715, lng: 31.3404, address: 'Nasr City' },
      { lat: 29.9792, lng: 31.1342, address: 'Maadi Area' },
    ]
  },
  casablanca: {
    name: 'Casablanca, Morocco',
    locations: [
      { lat: 33.5731, lng: -7.5898, address: 'City Center' },
      { lat: 33.5928, lng: -7.6189, address: 'Derb Sultan Market' },
      { lat: 33.5469, lng: -7.6358, address: 'Ain Diab' },
      { lat: 33.5992, lng: -7.5703, address: 'Sidi Moumen' },
    ]
  },
  tunis: {
    name: 'Tunis, Tunisia',
    locations: [
      { lat: 36.8065, lng: 10.1815, address: 'Medina of Tunis' },
      { lat: 36.8380, lng: 10.1858, address: 'Bab Bhar' },
      { lat: 36.8625, lng: 10.1972, address: 'La Marsa' },
      { lat: 36.7798, lng: 10.1658, address: 'Manouba' },
    ]
  },
  algiers: {
    name: 'Algiers, Algeria',
    locations: [
      { lat: 36.7538, lng: 3.0588, address: 'Casbah District' },
      { lat: 36.7372, lng: 3.0865, address: 'Bab El Oued' },
      { lat: 36.7765, lng: 3.0600, address: 'El Biar' },
    ]
  },

  // Southern Africa
  johannesburg: {
    name: 'Johannesburg, South Africa',
    locations: [
      { lat: -26.2041, lng: 28.0473, address: 'Johannesburg CBD' },
      { lat: -26.1715, lng: 28.0142, address: 'Soweto Township' },
      { lat: -26.1076, lng: 28.0567, address: 'Sandton City' },
      { lat: -26.2309, lng: 28.0583, address: 'Fordsburg' },
      { lat: -26.1858, lng: 27.9794, address: 'Roodepoort' },
    ]
  },
  capetown: {
    name: 'Cape Town, South Africa',
    locations: [
      { lat: -33.9249, lng: 18.4241, address: 'City Bowl, CBD' },
      { lat: -33.9175, lng: 18.4292, address: 'Bo-Kaap' },
      { lat: -33.9608, lng: 18.4764, address: 'Khayelitsha Township' },
      { lat: -34.0522, lng: 18.4232, address: 'Muizenberg' },
    ]
  },
  durban: {
    name: 'Durban, South Africa',
    locations: [
      { lat: -29.8587, lng: 31.0218, address: 'Durban CBD' },
      { lat: -29.8674, lng: 30.9975, address: 'Warwick Triangle Market' },
      { lat: -29.7833, lng: 31.0497, address: 'Umhlanga' },
    ]
  },
  harare: {
    name: 'Harare, Zimbabwe',
    locations: [
      { lat: -17.8292, lng: 31.0522, address: 'Harare CBD' },
      { lat: -17.8647, lng: 31.0297, address: 'Mbare Township' },
      { lat: -17.7840, lng: 31.0474, address: 'Borrowdale' },
    ]
  },
  lusaka: {
    name: 'Lusaka, Zambia',
    locations: [
      { lat: -15.4167, lng: 28.2833, address: 'Cairo Road, CBD' },
      { lat: -15.3875, lng: 28.3228, address: 'Kalingalinga Compound' },
      { lat: -15.3929, lng: 28.3069, address: 'Soweto Market' },
    ]
  },
  maputo: {
    name: 'Maputo, Mozambique',
    locations: [
      { lat: -25.9692, lng: 32.5732, address: 'Downtown Maputo' },
      { lat: -25.9655, lng: 32.5891, address: 'Xipamanine Market' },
      { lat: -25.8889, lng: 32.5775, address: 'Matola' },
    ]
  },

  // Central Africa
  kinshasa: {
    name: 'Kinshasa, DR Congo',
    locations: [
      { lat: -4.3276, lng: 15.3136, address: 'Gombe, CBD' },
      { lat: -4.3317, lng: 15.2662, address: 'Kinshasa Market' },
      { lat: -4.4419, lng: 15.2663, address: 'Lemba District' },
      { lat: -4.3854, lng: 15.3348, address: 'Ngaliema' },
    ]
  },
  luanda: {
    name: 'Luanda, Angola',
    locations: [
      { lat: -8.8383, lng: 13.2344, address: 'Luanda Downtown' },
      { lat: -8.8147, lng: 13.2302, address: 'Roque Santeiro Market' },
      { lat: -8.8968, lng: 13.1834, address: 'Viana' },
    ]
  },
  douala: {
    name: 'Douala, Cameroon',
    locations: [
      { lat: 4.0511, lng: 9.7679, address: 'Akwa District' },
      { lat: 4.0469, lng: 9.7006, address: 'Bonaberi Market' },
      { lat: 4.0937, lng: 9.7373, address: 'New Bell' },
    ]
  },
};

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
  'School Compound Waste',
  'Beach Pollution',
  'Landfill Overflow',
  'Toxic Waste Concern'
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
  'School waste bins not maintained, affecting student health.',
  'Coastal area contaminated with plastic and waste materials.',
  'Municipal landfill exceeding capacity, overflow observed.',
  'Hazardous materials improperly disposed in public area.'
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

    // Get or create test user
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

    // Calculate total locations
    const totalLocations = Object.values(africanCities).reduce(
      (sum, city) => sum + city.locations.length,
      0
    );

    console.log('\n🌍 SEEDING PAN-AFRICAN WASTE REPORTS');
    console.log('=====================================');
    console.log(`📍 Cities: ${Object.keys(africanCities).length}`);
    console.log(`📌 Total locations: ${totalLocations}`);
    console.log('');

    const reports = [];
    let cityCount = 0;

    // Create reports for each city
    for (const [cityKey, cityData] of Object.entries(africanCities)) {
      cityCount++;
      console.log(`[${cityCount}/${Object.keys(africanCities).length}] 🏙️  ${cityData.name} (${cityData.locations.length} locations)`);

      for (const location of cityData.locations) {
        const titleIndex = Math.floor(Math.random() * reportTitles.length);
        const descIndex = Math.floor(Math.random() * reportDescriptions.length);

        const report = {
          title: reportTitles[titleIndex],
          description: reportDescriptions[descIndex],
          location: {
            type: 'Point',
            coordinates: [location.lng, location.lat],
            address: `${location.address}, ${cityData.name}`
          },
          wasteType: wasteTypes[Math.floor(Math.random() * wasteTypes.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          reportedBy: testUser._id,
          images: [],
          createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000) // Random within last 60 days
        };

        reports.push(report);
      }
    }

    const createdReports = await Report.insertMany(reports);

    console.log('\n✅ SEEDING COMPLETE!');
    console.log('===================');
    console.log(`📊 Total reports created: ${createdReports.length}`);

    // Summary statistics
    const statusCounts = {};
    const wasteTypeCounts = {};
    const regionCounts = {
      'East Africa': 0,
      'West Africa': 0,
      'North Africa': 0,
      'Southern Africa': 0,
      'Central Africa': 0
    };

    createdReports.forEach(report => {
      statusCounts[report.status] = (statusCounts[report.status] || 0) + 1;
      wasteTypeCounts[report.wasteType] = (wasteTypeCounts[report.wasteType] || 0) + 1;

      // Categorize by region based on city in address
      const address = report.location.address.toLowerCase();
      if (address.includes('kampala') || address.includes('nairobi') ||
        address.includes('dar es salaam') || address.includes('kigali') ||
        address.includes('addis ababa')) {
        regionCounts['East Africa']++;
      } else if (address.includes('lagos') || address.includes('accra') ||
        address.includes('abidjan') || address.includes('dakar')) {
        regionCounts['West Africa']++;
      } else if (address.includes('cairo') || address.includes('casablanca') ||
        address.includes('tunis') || address.includes('algiers')) {
        regionCounts['North Africa']++;
      } else if (address.includes('johannesburg') || address.includes('cape town') ||
        address.includes('durban') || address.includes('harare') ||
        address.includes('lusaka') || address.includes('maputo')) {
        regionCounts['Southern Africa']++;
      } else {
        regionCounts['Central Africa']++;
      }
    });

    console.log('\n📋 BY REGION:');
    Object.entries(regionCounts).forEach(([region, count]) => {
      console.log(`  ${region}: ${count} reports`);
    });

    console.log('\n📊 BY STATUS:');
    Object.entries(statusCounts).forEach(([status, count]) => {
      const percentage = ((count / createdReports.length) * 100).toFixed(1);
      console.log(`  ${status}: ${count} (${percentage}%)`);
    });

    console.log('\n🗑️  BY WASTE TYPE:');
    Object.entries(wasteTypeCounts).forEach(([type, count]) => {
      const percentage = ((count / createdReports.length) * 100).toFixed(1);
      console.log(`  ${type}: ${count} (${percentage}%)`);
    });

    // Geographic bounds
    const allLats = createdReports.map(r => r.location.coordinates[1]);
    const allLngs = createdReports.map(r => r.location.coordinates[0]);

    console.log('\n🌍 GEOGRAPHIC COVERAGE:');
    console.log(`  Latitude:  ${Math.min(...allLats).toFixed(2)}° to ${Math.max(...allLats).toFixed(2)}°`);
    console.log(`  Longitude: ${Math.min(...allLngs).toFixed(2)}° to ${Math.max(...allLngs).toFixed(2)}°`);
    console.log(`  Span: ~${Math.abs(Math.max(...allLats) - Math.min(...allLats)).toFixed(0)}° (N-S) × ${Math.abs(Math.max(...allLngs) - Math.min(...allLngs)).toFixed(0)}° (E-W)`);

    console.log('\n🗺️  VIEW ON MAP:');
    console.log('  1. Start your server: npm run dev');
    console.log('  2. Start your client: cd ../client && npm run dev');
    console.log('  3. Navigate to: http://localhost:5173/map');
    console.log('  4. Zoom out to see the pan-African distribution!');

    console.log('\n🎯 TEST USER:');
    console.log('  Email: test@reviwa.com');
    console.log('  Password: password123');

  } catch (error) {
    console.error('❌ Error seeding reports:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Database connection closed');
    process.exit(0);
  }
}

seedReports();
