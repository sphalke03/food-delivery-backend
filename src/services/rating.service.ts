import { AppDataSource } from "../utils/db";
import { Rating } from "../entities/Rating";

export const rateOrderAndAgent = async (orderId: number, rating: number, agentRating: number) => {
  const repo = AppDataSource.getRepository(Rating);
  const rate = repo.create({
    orderId,
    rating,
    agentRating,
  });
  return await repo.save(rate);
};

export const getAllRatings = async () => {
  return await AppDataSource.getRepository(Rating).find();
};
