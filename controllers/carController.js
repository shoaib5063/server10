import Car from '../models/Car.js';

/**
 * @desc    Get all cars with optional filters
 * @route   GET /api/cars
 * @access  Public
 */
export const getAllCars = async (req, res) => {
  try {
    const { category, search, limit, sort } = req.query;
    
    // Build query
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    // Build sort
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (sort === 'price-asc') {
      sortOption = { rentPrice: 1 };
    } else if (sort === 'price-desc') {
      sortOption = { rentPrice: -1 };
    }
    
    // Execute query
    let carsQuery = Car.find(query).sort(sortOption);
    
    if (limit) {
      carsQuery = carsQuery.limit(parseInt(limit));
    }
    
    const cars = await carsQuery;
    
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error('Get all cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cars',
      error: error.message
    });
  }
};

/**
 * @desc    Get 6 newest cars (featured)
 * @route   GET /api/cars/featured
 * @access  Public
 */
export const getFeaturedCars = async (req, res) => {
  try {
    const cars = await Car.find()
      .sort({ createdAt: -1 })
      .limit(6);
    
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error('Get featured cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured cars',
      error: error.message
    });
  }
};

/**
 * @desc    Get single car by ID
 * @route   GET /api/cars/:id
 * @access  Public
 */
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error('Get car by ID error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch car',
      error: error.message
    });
  }
};

/**
 * @desc    Get cars by provider email
 * @route   GET /api/cars/provider/:email
 * @access  Private
 */
export const getCarsByProvider = async (req, res) => {
  try {
    const { email } = req.params;
    
    // Verify user is requesting their own cars
    if (req.user.email !== email) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own listings'
      });
    }
    
    const cars = await Car.find({ providerEmail: email })
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error('Get cars by provider error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch provider cars',
      error: error.message
    });
  }
};

/**
 * @desc    Create new car listing
 * @route   POST /api/cars
 * @access  Private
 */
export const createCar = async (req, res) => {
  try {
    const { carName, description, category, rentPrice, location, imageUrl } = req.body;
    
    // Validate required fields
    if (!carName || !description || !category || !rentPrice || !location || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    // Create car with provider info from authenticated user
    const car = await Car.create({
      carName,
      description,
      category,
      rentPrice,
      location,
      imageUrl,
      providerName: req.user.name,
      providerEmail: req.user.email,
      availabilityStatus: 'Available'
    });
    
    res.status(201).json({
      success: true,
      message: 'Car listing created successfully',
      data: car
    });
  } catch (error) {
    console.error('Create car error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create car listing',
      error: error.message
    });
  }
};

/**
 * @desc    Update car listing
 * @route   PUT /api/cars/:id
 * @access  Private
 */
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    // Verify ownership
    if (car.providerEmail !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own listings'
      });
    }
    
    // Update allowed fields only
    const { carName, description, category, rentPrice, location, imageUrl } = req.body;
    
    if (carName) car.carName = carName;
    if (description) car.description = description;
    if (category) car.category = category;
    if (rentPrice) car.rentPrice = rentPrice;
    if (location) car.location = location;
    if (imageUrl) car.imageUrl = imageUrl;
    
    await car.save();
    
    res.status(200).json({
      success: true,
      message: 'Car listing updated successfully',
      data: car
    });
  } catch (error) {
    console.error('Update car error:', error);
    
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
      message: 'Failed to update car listing',
      error: error.message
    });
  }
};

/**
 * @desc    Delete car listing
 * @route   DELETE /api/cars/:id
 * @access  Private
 */
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    
    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    // Verify ownership
    if (car.providerEmail !== req.user.email) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own listings'
      });
    }
    
    await Car.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Car listing deleted successfully'
    });
  } catch (error) {
    console.error('Delete car error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Car not found'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to delete car listing',
      error: error.message
    });
  }
};
