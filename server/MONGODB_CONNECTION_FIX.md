# 🚨 MongoDB Atlas Connection Issue - IP Whitelist

## Problem

Your connection failed with this error:

```
Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## Quick Fix Steps

### 1. Whitelist Your IP Address

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Login** with your reviwaadmin account
3. **Navigate to Security** → **Network Access**
4. **Click "Add IP Address"**
5. **Choose one of these options**:
   - **Add Current IP Address** (recommended for development)
   - **Allow Access from Anywhere** (0.0.0.0/0 - less secure but works everywhere)

### 2. Verify Connection String Format

Your current connection string:

```
mongodb+srv://reviwaadmin:reviwaadmin@cluster0.uroqfjr.mongodb.net/reviwa-sustainability?retryWrites=true&w=majority&appName=Cluster0
```

This looks correct! ✅

### 3. Test Connection Again

Once you've whitelisted your IP, run:

```bash
cd server
node scripts/test-connection.js
```

Expected success output:

```
🧪 Testing MongoDB Connection for Reviwa Environmental Platform...
✅ MongoDB Connection Successful!
📊 Database: reviwa-sustainability
🌐 Host: cluster0-shard-00-02.uroqfjr.mongodb.net:27017
📈 Connection State: Connected
📁 Existing Collections: None (new database)
🎉 Database connection test passed!
```

### 4. Initialize Database with Environmental Data

After successful connection, run:

```bash
node scripts/setup-database.js
```

This will create:

- 3 sample environmental users with green points
- Geospatial indexing for location features
- Achievement system data
- Environmental community structure

## Alternative: Local MongoDB

If Atlas continues to have issues, you can use local MongoDB:

1. **Install MongoDB Community**: https://www.mongodb.com/try/download/community
2. **Update .env**:
   ```
   MONGODB_URI=mongodb://localhost:27017/reviwa-sustainability-local
   ```
3. **Start MongoDB service**:
   ```bash
   # Windows (Run as Administrator)
   net start MongoDB
   ```

## Next Steps After Connection Success

1. ✅ Database connectivity confirmed
2. 🌱 Initialize with environmental users
3. 🗺️ Test geospatial queries for waste locations
4. 🚀 Begin frontend development

---

**Need Help?** The MongoDB Atlas documentation has step-by-step screenshots for IP whitelisting: https://www.mongodb.com/docs/atlas/security-whitelist/
