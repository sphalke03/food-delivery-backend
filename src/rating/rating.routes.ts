import { Router } from 'express';
import { createRating, getRatingsByRestaurant, getAverageRating } from './rating.controller';

const router = Router();

router.post('/', createRating);
router.get('/:restaurantId', getRatingsByRestaurant);
router.get('/:restaurantId/average', getAverageRating);

export default router;