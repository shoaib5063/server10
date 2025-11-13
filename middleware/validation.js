/**
 * Validation middleware for request body
 */

/**
 * Validate car creation/update data
 */
export const validateCarData = (req, res, next) => {
  const { carName, description, category, rentPrice, location, imageUrl } = req.body;
  const errors = [];
  
  // Validate car name
  if (carName !== undefined) {
    if (!carName || carName.trim().length < 3) {
      errors.push('Car name must be at least 3 characters long');
    }
  }
  
  // Validate description
  if (description !== undefined) {
    if (!description || description.trim().length < 20) {
      errors.push('Description must be at least 20 characters long');
    }
  }
  
  // Validate category
  if (category !== undefined) {
    const validCategories = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric'];
    if (!validCategories.includes(category)) {
      errors.push('Category must be one of: Sedan, SUV, Hatchback, Luxury, Electric');
    }
  }
  
  // Validate rent price
  if (rentPrice !== undefined) {
    if (isNaN(rentPrice) || rentPrice < 0) {
      errors.push('Rent price must be a positive number');
    }
  }
  
  // Validate location
  if (location !== undefined) {
    if (!location || location.trim().length === 0) {
      errors.push('Location is required');
    }
  }
  
  // Validate image URL
  if (imageUrl !== undefined) {
    if (!imageUrl || imageUrl.trim().length === 0) {
      errors.push('Image URL is required');
    }
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};

/**
 * Validate booking data
 */
export const validateBookingData = (req, res, next) => {
  const { carId } = req.body;
  const errors = [];
  
  if (!carId) {
    errors.push('Car ID is required');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  next();
};
