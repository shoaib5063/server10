import express from 'express';
import {
  getUserBookings,
  getCarBookingStatus,
  createBooking
} from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/car/:carId', getCarBookingStatus);

// Protected routes
router.get('/user/:email', verifyToken, getUserBookings);
router.post('/', verifyToken, createBooking);

export default router;
