import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Restaurant } from '../entities/Restaurant';
import { MenuItem } from '../entities/MenuItem';

// Add new restaurant (open to public for now)
export const createRestaurant = async (req: Request, res: Response) => {
  const { name, isOnline } = req.body;
  const restaurant = AppDataSource.getRepository(Restaurant).create({ name, isOnline });
  const saved = await AppDataSource.getRepository(Restaurant).save(restaurant);
  res.status(201).json(saved);
};

// Get all online restaurants with their menu items
export const getOnlineRestaurants = async (_req: Request, res: Response) => {
  const restaurants = await AppDataSource.getRepository(Restaurant).find({
    where: { isOnline: true },
    relations: ['menu'],
  });
  res.json(restaurants);
};

// Update menu for a restaurant
export const updateMenu = async (req: Request, res: Response) => {
  const { restaurantId, items } = req.body;
  const restaurant = await AppDataSource.getRepository(Restaurant).findOneBy({ id: restaurantId });
  if (!restaurant) return res.status(404).json({ error: 'Restaurant not found' });

  const menuItems = items.map((item: any) =>
    AppDataSource.getRepository(MenuItem).create({ ...item, restaurant })
  );

  const saved = await AppDataSource.getRepository(MenuItem).save(menuItems);
  res.json(saved);
};
