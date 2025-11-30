# 🌍 Database Seeding Scripts

This directory contains scripts to populate your database with dummy test data for development and testing purposes.

## 📋 Available Scripts

### 1. Seed Pan-African Reports ⭐ RECOMMENDED

Creates reports across **24 major African cities** from all 5 regions!

```bash
cd server
npm run seed:africa
```

**What it covers:**

- 🌍 **24 cities** across Africa
- 📍 **80+ locations** total
- 🗺️ **5 regions**: East, West, North, Southern, Central Africa

**Cities included:**

- **East Africa**: Kampala, Nairobi, Dar es Salaam, Kigali, Addis Ababa
- **West Africa**: Lagos, Accra, Abidjan, Dakar
- **North Africa**: Cairo, Casablanca, Tunis, Algiers
- **Southern Africa**: Johannesburg, Cape Town, Durban, Harare, Lusaka, Maputo
- **Central Africa**: Kinshasa, Luanda, Douala

### 2. Seed Single City Reports

Creates 15 dummy waste reports for Kampala only.

```bash
cd server
npm run seed:reports
```

### 3. Seed Multiple Cities (3 Options)

Creates dummy reports for one city at a time. Edit the `CITY` variable first.

```bash
cd server
npm run seed:cities
```

## 🎨 Customizing Locations

Want to add your own city? Edit either script:

```javascript
// Add your locations in this format
const myLocations = [
  { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE, address: "Location Name" },
  { lat: YOUR_LATITUDE, lng: YOUR_LONGITUDE, address: "Location Name" },
  // Add more...
];
```

**Finding Coordinates:**

1. Go to [Google Maps](https://maps.google.com)
2. Right-click on a location
3. Click the coordinates to copy them
4. Format as: `{ lat: LATITUDE, lng: LONGITUDE, address: 'Name' }`

## 🗺️ Testing the Map

After seeding with Pan-African data:

1. Start your server: `npm run dev`
2. Start your client: `cd ../client && npm run dev`
3. Navigate to: `http://localhost:5173/map`
4. **Zoom out** to see reports across the entire African continent! 🌍
5. Click markers to view report details
6. Use filters to narrow down by region or waste type

### What You'll See:

- 🔵 **Marker clusters** grouping nearby reports
- 🎨 **Color-coded markers** by status (pending=yellow, verified=blue, in-progress=orange, resolved=green)
- 📍 Reports from **Cairo to Cape Town**, **Lagos to Nairobi**
- 🗺️ True **pan-African distribution** showcasing continental waste management

## 🧹 Clearing Data

To remove all reports and start fresh, uncomment this line in the seed script:

```javascript
// Uncomment this line:
await Report.deleteMany({});
```

## 📊 Example Output

```
✅ MongoDB connected successfully
✅ Test user created

🌍 Creating 15 dummy reports for KAMPALA...
✅ Successfully created 15 dummy reports!

📊 Report Summary:

By Status:
  pending: 3
  verified: 5
  in-progress: 4
  resolved: 3

By Waste Type:
  plastic: 4
  organic: 2
  metal: 3
  glass: 2
  electronic: 2
  mixed: 2

🗺️  You can now view these reports on the map!
📍 City: KAMPALA
🌐 Coordinates range:
  Latitude: 0.2623 to 0.3945
  Longitude: 32.5234 to 32.6523

👋 Database connection closed
```

## 🔐 Test User Credentials

The seeding script creates a test user:

- **Email:** test@reviwa.com
- **Password:** password123
- **Role:** user

You can use these credentials to log in and test the application!

## 🚨 Important Notes

1. **Don't run in production!** These scripts are for development only
2. **MongoDB connection required** - Make sure your `.env` file has `MONGODB_URI`
3. **Coordinates are real** - They represent actual locations in the specified cities
4. **No images** - Dummy reports don't include images to keep seeding fast
5. **Random data** - Each run creates different combinations of waste types and severity

## 🛠️ Troubleshooting

**MongoDB connection error?**

- Check your `.env` file has `MONGODB_URI`
- Make sure MongoDB is running
- Verify connection string is correct

**Script hangs?**

- Press `Ctrl+C` to stop
- Check MongoDB Atlas network access settings
- Verify firewall isn't blocking connection

**Duplicate reports?**

- The script doesn't delete existing reports by default
- Uncomment `await Report.deleteMany({});` to clear first

## 💡 Tips

1. **Mix it up** - Run the script multiple times to get more data
2. **Test filters** - Different statuses/types help test the filter functionality
3. **Check clustering** - With 15+ reports, you'll see the marker clustering in action
4. **Test search** - Try searching for specific waste types or locations

---

Happy testing! 🎉
