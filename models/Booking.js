import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Car ID is required']
  },
  carName: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true
  },
  carImage: {
    type: String,
    required: [true, 'Car image is required'],
    trim: true
  },
  rentPrice: {
    type: Number,
    required: [true, 'Rent price is required'],
    min: [0, 'Rent price must be a positive number']
  },
  renterEmail: {
    type: String,
    required: [true, 'Renter email is required'],
    trim: true,
    lowercase: true
  },
  renterName: {
    type: String,
    required: [true, 'Renter name is required'],
    trim: true
  },
  providerEmail: {
    type: String,
    required: [true, 'Provider email is required'],
    trim: true,
    lowercase: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Cancelled'],
    default: 'Active'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
bookingSchema.index({ renterEmail: 1 });
bookingSchema.index({ carId: 1 });
bookingSchema.index({ providerEmail: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
