// ../user-service/routes/userRoutes.ts
import express from 'express';
import { createUser, getUsers } from '../controllers/userController';
const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

export default router;

// ../user-service/routes/orderRoutes.ts
import express from 'express';
import { placeOrder, getOrdersByUserId } from '../controllers/orderController';
const router = express.Router();

router.post('/', placeOrder);
router.get('/user/:userId', getOrdersByUserId);

export default router;
