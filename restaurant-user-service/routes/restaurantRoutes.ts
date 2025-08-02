import express from 'express';
import { createRestaurant, getOnlineRestaurants, updateMenu } from '../controllers/restaurantController';
const router = express.Router();

router.post('/', createRestaurant);               // Add restaurant
router.get('/online', getOnlineRestaurants);      // Get online restaurants with menu
router.post('/menu', updateMenu);                 // Update menu

export default router;
