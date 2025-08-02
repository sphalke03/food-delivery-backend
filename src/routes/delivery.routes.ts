import { Router } from 'express';
import { updateDeliveryStatus } from '../controllers/delivery.controller';
const router = Router();

router.put('/status', updateDeliveryStatus);

export default router;