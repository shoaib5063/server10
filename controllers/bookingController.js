import Booking from '../models/Booking.js';
import Car from '../models/Car.js';
import mongoose from 'mongoose';

/**
 * @desc    Get all bookings for a user
 * @route   GET /api/bookings/user/:email
 * @access  Private
 */
export const getUserBookings = async (req, res) => {
  try {
    const { email } = req.params;
    
    // Verify user is requesting their own bookings
    if (req.user.email !== email) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own bookings'
      });
    }
    
    const bookings = await Booking.find({ renterEmail: email })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
};

/**
 * @desc    Check if a car is booked
 * @route   GET /api/bookings/car/:carId
 * @access  Public
 */
export const getCarBookingStatus = async (req, res) => {
  try {
    const { carId } = req.params;
    
    const booking = await Booking.findOne({ 
      carId, 
      status: 'Active' 
    });
    
    res.status(200).json({
      success: true,
      isBooked: !!booking,
      data: booking
    });
  } catch (error) {
    console.error('Get car booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check booking status',
      error: error.message
    });
  }
};

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Private
 */
export const createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { carId } = req.body;
    
    if (!carId) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'Car ID is required'
      });
    }
    
    // Find the car
    const car = await Car.findById(carId).session(session);
    
    if (!car) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    // Check if car is already booked
    if (car.availabilityStatus === 'Booked') {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'This car is no longer available'
      });
    }
    
    // Check for existing active booking
    const existingBooking = await Booking.findOne({
      carId,
      status: 'Active'
    }).session(session);
    
    if (existingBooking) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'This car is already booked'
      });
    }
    
    // Prevent provider from booking their own car
    if (car.providerEmail === req.user.email) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: 'You cannot book your own car'
      });
    }
    
    // Create booking
    const booking = await Booking.create([{
      carId: car._id,
      carName: car.carName,
      carImage: car.imageUrl,
      rentPrice: car.rentPrice,
      renterEmail: req.user.email,
      renterName: req.user.name,
      providerEmail: car.providerEmail,
      status: 'Active'
    }], { session });
    
    // Update car availability status
    car.availabilityStatus = 'Booked';
    await car.save({ session });
    
    // Commit transaction
    await session.commitTransaction();
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking[0]
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Create booking error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  } finally {
    session.endSession();
  }
};
