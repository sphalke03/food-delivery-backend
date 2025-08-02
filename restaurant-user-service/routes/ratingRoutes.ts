import express from 'express';
import { addRating, getRatings } from '../controllers/ratingController';
const router = express.Router();

router.post('/', addRating);      // Submit new rating
router.get('/', getRatings);      // List all ratings

export default router;
