// src/routes/deliveryAgent.routes.ts
import { Router } from 'express';
import * as controller from '../controllers/deliveryAgent.controller';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
