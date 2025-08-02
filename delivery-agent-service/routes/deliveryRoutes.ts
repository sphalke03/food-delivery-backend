// ../delivery-agent-service/routes/deliveryRoutes.ts
import express from 'express';
import { createAgent, updateStatus, getAllAgents } from '../controllers/deliveryController';
const router = express.Router();

router.post('/', createAgent);
router.put('/:id/status', updateStatus);
router.get('/', getAllAgents);

export default router;