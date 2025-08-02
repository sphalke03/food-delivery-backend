import express from 'express';
import { placeOrder, getOrdersByUserId } from '../controllers/orderController';

const router = express.Router();

// Place a new order
router.post('/', placeOrder);

// Get all orders placed by a specific user
router.get('/user/:userId', getOrdersByUserId);

export default router;
