import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
// CORS configuration for multiple origins
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5000',
    process.env.CLIENT_URL
  ].filter(Boolean), // Remove undefined values
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to connect to MongoDB on each request (for serverless)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Import routes
import carRoutes from './routes/carRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      mongoConfigured: !!process.env.MONGODB_URI,
      mongoUriPrefix: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'NOT SET'
    }
  });
});

// Database status endpoint
app.get('/api/db-status', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({
      status: states[dbState],
      readyState: dbState,
      mongoUri: process.env.MONGODB_URI ? 'Configured' : 'NOT SET'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Car Rental API',
    endpoints: {
      health: '/api/health',
      cars: '/api/cars',
      bookings: '/api/bookings'
    }
  });
});

// API Routes
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server (only in development)
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;
