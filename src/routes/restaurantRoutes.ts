import { Router } from 'express';
import { createRestaurant, getAllRestaurants, addMenuItem } from '../controllers/restaurantController';
const router = Router();

router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.post('/:id/menu', addMenuItem);

export default router;

// routes/ratingRoutes.ts
import { Router } from 'express';
import { rateOrder, rateAgent, getOrderRating, getAgentRating } from '../controllers/ratingController';
const router = Router();

router.post('/order', rateOrder);
router.post('/agent', rateAgent);
router.get('/order/:orderId', getOrderRating);
router.get('/agent/:agentId', getAgentRating);

export default router;
