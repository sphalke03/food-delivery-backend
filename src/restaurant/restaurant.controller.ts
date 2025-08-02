// src/restaurant/restaurant.controller.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Restaurant } from './restaurant.entity';
import { MenuItem } from './menu-items.entity';

const restaurantRepo = AppDataSource.getRepository(Restaurant);
const menuRepo = AppDataSource.getRepository(MenuItem);

// Create Restaurant
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = restaurantRepo.create(req.body);
    const saved = await restaurantRepo.save(restaurant);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error creating restaurant', err });
  }
};

// Get All Restaurants
export const getAllRestaurants = async (_req: Request, res: Response) => {
  const restaurants = await restaurantRepo.find();
  res.json(restaurants);
};

// Get Restaurant by ID
export const getRestaurantById = async (req: Request, res: Response) => {
  const restaurant = await restaurantRepo.findOneBy({ id: parseInt(req.params.id) });
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
  res.json(restaurant);
};

// Update Restaurant
export const updateRestaurant = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await restaurantRepo.update(id, req.body);
  const updated = await restaurantRepo.findOneBy({ id });
  res.json(updated);
};

// Delete Restaurant
export const deleteRestaurant = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  await restaurantRepo.delete(id);
  res.status(204).send();
};

// Add Menu Item to Restaurant
export const addMenuItem = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantRepo.findOneBy({ id: parseInt(req.params.restaurantId) });
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    const menuItem = menuRepo.create({ ...req.body, restaurant });
    const saved = await menuRepo.save(menuItem);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error adding menu item', err });
  }
};

// Get Menu Items for a Restaurant
export const getMenuByRestaurant = async (req: Request, res: Response) => {
  const items = await menuRepo.find({ where: { restaurant: { id: parseInt(req.params.restaurantId) } } });
  res.json(items);
};

// Update Menu Item
export const updateMenuItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.menuItemId);
  await menuRepo.update(id, req.body);
  const updated = await menuRepo.findOneBy({ id });
  res.json(updated);
};

// Delete Menu Item
export const deleteMenuItem = async (req: Request, res: Response) => {
  const id = parseInt(req.params.menuItemId);
  await menuRepo.delete(id);
  res.status(204).send();
};
