import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Rating } from '../entities/Rating';

const ratingRepo = AppDataSource.getRepository(Rating);

export const rateOrder = async (req: Request, res: Response) => {
  const { userId, orderId, rating, comment } = req.body;
  const newRating = ratingRepo.create({ userId, orderId, rating, comment });
  await ratingRepo.save(newRating);
  res.status(201).json(newRating);
};

export const rateAgent = async (req: Request, res: Response) => {
  const { userId, agentId, rating, comment } = req.body;
  const newRating = ratingRepo.create({ userId, agentId, rating, comment });
  await ratingRepo.save(newRating);
  res.status(201).json(newRating);
};

export const getOrderRating = async (req: Request, res: Response) => {
  const ratings = await ratingRepo.find({ where: { orderId: req.params.orderId } });
  res.json(ratings);
};

export const getAgentRating = async (req: Request, res: Response) => {
  const ratings = await ratingRepo.find({ where: { agentId: req.params.agentId } });
  res.json(ratings);
};