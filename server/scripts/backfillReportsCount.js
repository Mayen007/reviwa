import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Report from '../models/Report.model.js';

// Load env from server/config/env.js or .env
dotenv.config({ path: process.env.ENV_PATH || '.env' });

async function main() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('No MongoDB URI found in environment. Set MONGO_URI or DATABASE_URL.');
    process.exit(1);
  }

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB');

  try {
    // Aggregate report counts per user
    const counts = await Report.aggregate([
      { $group: { _id: '$reportedBy', count: { $sum: 1 } } }
    ]);

    // Build map
    const countMap = new Map();
    counts.forEach((c) => {
      if (c._id) countMap.set(c._id.toString(), c.count);
    });

    // Fetch all users and update reportsCount
    const users = await User.find({}, '_id reportsCount');
    console.log(`Found ${users.length} users`);

    let updated = 0;
    for (const u of users) {
      const actual = countMap.get(u._id.toString()) || 0;
      if (u.reportsCount !== actual) {
        await User.updateOne({ _id: u._id }, { $set: { reportsCount: actual } });
        console.log(`Updated user ${u._id}: ${u.reportsCount} -> ${actual}`);
        updated++;
      }
    }

    console.log(`Backfill complete. Updated ${updated} user(s).`);
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
    process.exit(0);
  }
}

main();
