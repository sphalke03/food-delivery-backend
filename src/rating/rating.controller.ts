// src/rating/rating.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Rating } from './rating.entity';
import { User } from '../user/user.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

const ratingRepo = AppDataSource.getRepository(Rating);
const userRepo = AppDataSource.getRepository(User);
const restaurantRepo = AppDataSource.getRepository(Restaurant);

export const createRating = async (req: Request, res: Response) => {
  try {
    const { userId, restaurantId, score, comment } = req.body;

    const user = await userRepo.findOneBy({ id: userId });
    const restaurant = await restaurantRepo.findOneBy({ id: restaurantId });

    if (!user || !restaurant) return res.status(404).json({ message: 'User or Restaurant not found' });

    const rating = ratingRepo.create({ score, comment, user, restaurant });
    const saved = await ratingRepo.save(rating);

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating rating', err });
  }
};

export const getRatingsByRestaurant = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.restaurantId);
  const ratings = await ratingRepo.find({ where: { restaurant: { id: restaurantId } }, relations: ['user'] });
  res.json(ratings);
};

export const getAverageRating = async (req: Request, res: Response) => {
  const restaurantId = parseInt(req.params.restaurantId);
  const result = await ratingRepo
    .createQueryBuilder('rating')
    .select('AVG(rating.score)', 'avg')
    .where('rating.restaurantId = :restaurantId', { restaurantId })
    .getRawOne();

  res.json({ average: parseFloat(result.avg).toFixed(2) });
};
