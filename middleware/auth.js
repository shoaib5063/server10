import admin from '../config/firebase.js';

/**
 * Middleware to verify Firebase authentication token
 * Extracts token from Authorization header and verifies it
 * Attaches decoded user information to request object
 */
export const verifyToken = async (req, res, next) => {
  try {
    // Check if Firebase Admin is initialized
    if (!admin.apps.length) {
      return res.status(503).json({
        success: false,
        message: 'Authentication service not configured. Please contact administrator.'
      });
    }

    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Authorization required.'
      });
    }

    // Extract token
    const token = authHeader.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token format'
      });
    }

    // Verify token with Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Attach user info to request object
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name || decodedToken.displayName,
      picture: decodedToken.picture
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.'
      });
    }
    
    if (error.code === 'auth/argument-error') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token provided'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed. Invalid or expired token.'
    });
  }
};

/**
 * Middleware to verify resource ownership
 * Checks if the authenticated user owns the resource
 */
export const verifyOwnership = (emailField = 'providerEmail') => {
  return (req, res, next) => {
    const userEmail = req.user?.email;
    const resourceEmail = req.body[emailField] || req.params[emailField];

    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (userEmail !== resourceEmail) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to perform this action'
      });
    }

    next();
  };
};
