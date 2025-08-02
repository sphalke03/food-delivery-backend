import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Rating } from '../entities/Rating';

// User submits a rating for a restaurant
export const addRating = async (req: Request, res: Response) => {
  const { restaurantId, userId, rating, comment } = req.body;
  const newRating = AppDataSource.getRepository(Rating).create({ restaurantId, userId, rating, comment });
  const saved = await AppDataSource.getRepository(Rating).save(newRating);
  res.status(201).json(saved);
};

// Retrieve all ratings
export const getRatings = async (_req: Request, res: Response) => {
  const ratings = await AppDataSource.getRepository(Rating).find();
  res.json(ratings);
};
