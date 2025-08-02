// src/restaurant/restaurant.routes.ts
import { Router } from 'express';
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  getMenuByRestaurant,
  updateMenuItem,
  deleteMenuItem
} from './restaurant.controller';

const router = Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

router.post('/:restaurantId/menu', addMenuItem);
router.get('/:restaurantId/menu', getMenuByRestaurant);
router.put('/menu/:menuItemId', updateMenuItem);
router.delete('/menu/:menuItemId', deleteMenuItem);

export default router;