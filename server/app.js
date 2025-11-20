import express from 'express';
import cors from 'cors';
import errorHandler from './middleware/errorHandler.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import reportRoutes from './routes/report.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Configure CORS allowed origins (same logic as server entrypoint)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://reviwa.netlify.app',
  process.env.CLIENT_URL
]
  .filter(Boolean)
  .map((url) => url.replace(/\/$/, ''));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Reviwa API is running', timestamp: new Date().toISOString() });
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
