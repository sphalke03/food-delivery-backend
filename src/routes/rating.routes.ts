import { Router } from 'express';
import { getRatings } from '../controllers/rating.controller';
const router = Router();

router.get('/', getRatings);

export default router;
