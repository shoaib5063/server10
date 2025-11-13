import express from 'express';
import {
  getAllCars,
  getFeaturedCars,
  getCarById,
  getCarsByProvider,
  createCar,
  updateCar,
  deleteCar
} from '../controllers/carController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllCars);
router.get('/featured', getFeaturedCars);
router.get('/:id', getCarById);

// Protected routes
router.get('/provider/:email', verifyToken, getCarsByProvider);
router.post('/', verifyToken, createCar);
router.put('/:id', verifyToken, updateCar);
router.delete('/:id', verifyToken, deleteCar);

export default router;
