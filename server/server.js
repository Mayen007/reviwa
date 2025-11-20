import './config/env.js'; // Load environment variables FIRST
import connectDB from './config/database.js';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import registerSockets from './sockets/index.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB (entrypoint only)
connectDB();

// Configure allowed origins to match app
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://reviwa.netlify.app',
  process.env.CLIENT_URL
]
  .filter(Boolean)
  .map((url) => url.replace(/\/$/, ''));

// Start server with Socket.IO
const httpServer = createServer(app);

const io = new IOServer(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  }
});

// Attach io to app locals so controllers can access it via req.app.locals.io
app.locals.io = io;

// Register socket handlers
registerSockets(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
  console.log('⚡ Socket.IO initialized');
});
