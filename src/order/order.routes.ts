import { Router } from 'express';
import { placeOrder, getOrderById } from './order.controller';

const router = Router();

router.post('/', placeOrder);
router.get('/:id', getOrderById);

export default router;