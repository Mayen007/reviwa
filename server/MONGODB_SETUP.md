# MongoDB Setup Guide for Reviwa Environmental Platform

## Quick Setup Options

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas Account**

   - Visit [MongoDB Atlas](https://cloud.mongodb.com/)
   - Sign up for a free account
   - Create a new cluster (M0 tier is free)

2. **Configure Database Access**

   - Go to Database Access → Add New Database User
   - Create username/password (e.g., `reviwa-user` / `secure-password`)
   - Grant "Atlas Admin" role

3. **Configure Network Access**

   - Go to Network Access → Add IP Address
   - Add `0.0.0.0/0` for development (restrict for production)

4. **Get Connection String**

   - Go to Clusters → Connect → Connect your application
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `reviwa-sustainability`

5. **Update .env File**
   ```env
   MONGODB_URI=mongodb+srv://reviwa-user:secure-password@cluster0.xxxxx.mongodb.net/reviwa-sustainability?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB (Development)

1. **Install MongoDB Community Server**

   - Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Install with default settings
   - MongoDB will run on `mongodb://localhost:27017`

2. **Update .env File**

   ```env
   MONGODB_URI=mongodb://localhost:27017/reviwa-sustainability-dev
   ```

3. **Start MongoDB Service**

   ```bash
   # Windows (Run as Administrator)
   net start MongoDB

   # macOS/Linux
   sudo systemctl start mongod
   ```

### Option 3: Docker MongoDB (Alternative)

1. **Run MongoDB in Docker**

   ```bash
   docker run --name reviwa-mongodb -p 27017:27017 -d mongo:latest
   ```

2. **Update .env File**
   ```env
   MONGODB_URI=mongodb://localhost:27017/reviwa-sustainability-docker
   ```

## Testing Your Setup

1. **Create .env File**

   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

2. **Run Database Setup**

   ```bash
   node scripts/setup-database.js
   ```

3. **Expected Output**
   ```
   🌱 Connecting to Reviwa Sustainability Platform Database...
   ✅ Connected to MongoDB successfully
   🧹 Clearing existing data...
   ✅ Database cleared
   🌍 Creating sample environmental users...
   ✅ Created user: Eco Champion Sarah (sarah@example.com)
   ✅ Created environmental_org: Green Solutions NGO (contact@greensolutions.org)
   ✅ Created admin: Sustainability Admin (admin@reviwa.com)
   🗺️ Testing geospatial indexing...
   ✅ Found 1 users within 100km of San Francisco
   🌱 Testing sustainability features...
   ✅ Leaderboard query successful - 3 top users retrieved
   📊 Verifying database indexes...
   ✅ Database indexes: [object Object],[object Object],[object Object]
   🎉 Database setup completed successfully!
   ```

## Database Collections Structure

After setup, your database will contain:

### Users Collection

- Environmental user profiles with green points
- Location data with geospatial indexing
- Sustainability achievements and interests
- Role-based access (user/environmental_org/admin)

### Sample Data Created

- **Regular User**: `sarah@example.com` / `EcoPass123!`
- **Environmental Org**: `contact@greensolutions.org` / `GreenOrg123!`
- **Admin**: `admin@reviwa.com` / `AdminPass123!`

## Troubleshooting

### Connection Errors

- **ENOTFOUND**: Check your connection string format
- **Authentication failed**: Verify username/password in connection string
- **Network timeout**: Check Network Access settings in Atlas

### Local MongoDB Issues

- **Service not running**: Start MongoDB service
- **Port conflicts**: MongoDB default port is 27017
- **Permission issues**: Run as administrator on Windows

### Environment Variables

- Make sure `.env` file is in `server/` directory
- Don't commit `.env` to git (it's in `.gitignore`)
- Use `.env.example` as a template

## Next Steps

1. Set up your preferred MongoDB option
2. Update `.env` with your connection string
3. Run `node scripts/setup-database.js`
4. Start the server: `npm run dev`
5. Test API endpoints with sample users

## Production Considerations

- Use MongoDB Atlas for production
- Restrict Network Access to your server IPs only
- Use strong database passwords
- Enable database encryption
- Set up automated backups
- Monitor database performance
