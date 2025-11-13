import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  carName: {
    type: String,
    required: [true, 'Car name is required'],
    trim: true,
    minlength: [3, 'Car name must be at least 3 characters long']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [20, 'Description must be at least 20 characters long']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric'],
      message: '{VALUE} is not a valid category'
    }
  },
  rentPrice: {
    type: Number,
    required: [true, 'Rent price is required'],
    min: [0, 'Rent price must be a positive number']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  providerName: {
    type: String,
    required: [true, 'Provider name is required'],
    trim: true
  },
  providerEmail: {
    type: String,
    required: [true, 'Provider email is required'],
    trim: true,
    lowercase: true
  },
  availabilityStatus: {
    type: String,
    enum: ['Available', 'Booked'],
    default: 'Available'
  }
}, {
  timestamps: true
});

// Create indexes for better query performance
carSchema.index({ providerEmail: 1 });
carSchema.index({ availabilityStatus: 1 });
carSchema.index({ createdAt: -1 });
carSchema.index({ carName: 'text' });

const Car = mongoose.model('Car', carSchema);

export default Car;
