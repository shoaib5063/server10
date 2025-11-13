import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  // If already connected, return
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  // If mongoose is already connected, mark as connected
  if (mongoose.connections[0].readyState) {
    isConnected = true;
    console.log('Using existing mongoose connection');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    isConnected = false;
    throw error;
  }
};

export default connectDB;
