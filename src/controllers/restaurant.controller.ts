// controllers/restaurantController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Restaurant } from '../entities/Restaurant';
import { MenuItem } from '../entities/MenuItem';

const restaurantRepo = AppDataSource.getRepository(Restaurant);
const menuRepo = AppDataSource.getRepository(MenuItem);

export const createRestaurant = async (req: Request, res: Response) => {
  const restaurant = restaurantRepo.create(req.body);
  await restaurantRepo.save(restaurant);
  res.status(201).json(restaurant);
};

export const getAllRestaurants = async (_req: Request, res: Response) => {
  const restaurants = await restaurantRepo.find({ relations: ['menu'] });
  res.json(restaurants);
};

export const addMenuItem = async (req: Request, res: Response) => {
  const restaurant = await restaurantRepo.findOneBy({ id: parseInt(req.params.id) });
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

  const item = menuRepo.create({ ...req.body, restaurant });
  await menuRepo.save(item);
  res.status(201).json(item);
};