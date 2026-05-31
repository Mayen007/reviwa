import './config/env.js'; // Load environment variables FIRST
import connectDB from './config/database.js';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';
import { createServer } from 'http';
import { Server as IOServer } from 'socket.io';
import registerSockets from './sockets/index.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

// Initialize Sentry (if DSN provided)
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Integrations.Express({ app: undefined })],
    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),
    environment: process.env.NODE_ENV || 'development'
  });
  console.log('📡 Sentry initialized');
} else {
  console.log('📡 Sentry not configured (SENTRY_DSN not set)');
}

const startServer = async () => {
  try {
    // Connect to MongoDB before accepting requests so route queries do not buffer.
    await connectDB();

    // Configure allowed origins to match app
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://reviwa.netlify.app',
      process.env.CLIENT_URL,
      // Allow all origins in development for mobile testing
      process.env.NODE_ENV === 'development' ? '*' : null
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
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
