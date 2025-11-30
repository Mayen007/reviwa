import mongoose from 'mongoose';
import User from '../models/User.model.js';
import Report from '../models/Report.model.js';
import { MONGODB_URI } from '../config/env.js';

/**
 * Script to recalculate report counts for all users
 * Usage: node scripts/recalculateReportCounts.js
 */

const recalculateReportCounts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get all users
    const users = await User.find({});
    console.log(`\n📊 Found ${users.length} users. Recalculating report counts...\n`);

    let updatedCount = 0;
    let unchangedCount = 0;

    for (const user of users) {
      // Count actual reports for this user
      const actualReportCount = await Report.countDocuments({ reportedBy: user._id });

      // Compare with stored count
      if (user.reportsCount !== actualReportCount) {
        console.log(`🔄 ${user.name} (${user.email})`);
        console.log(`   Stored: ${user.reportsCount} → Actual: ${actualReportCount}`);

        // Update the user
        await User.findByIdAndUpdate(user._id, { reportsCount: actualReportCount });
        updatedCount++;
      } else {
        unchangedCount++;
      }
    }

    console.log(`\n✅ Recalculation complete!`);
    console.log(`   Updated: ${updatedCount} users`);
    console.log(`   Unchanged: ${unchangedCount} users`);

    // Show top reporters
    console.log(`\n🏆 Top 10 Reporters:`);
    const topReporters = await User.find({})
      .select('name email reportsCount ecoPoints')
      .sort({ reportsCount: -1 })
      .limit(10);

    topReporters.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.name} - ${user.reportsCount} reports (${user.ecoPoints} eco points)`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

recalculateReportCounts();
