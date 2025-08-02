// src/restaurant/restaurant.service.ts
import { AppDataSource } from "../data-source";
import { Restaurant } from "./restaurant.entity";

const restaurantRepo = AppDataSource.getRepository(Restaurant);

export const getAllRestaurants = async () => {
  return restaurantRepo.find();
};

export const createRestaurant = async (data: Partial<Restaurant>) => {
  const restaurant = restaurantRepo.create(data);
  return restaurantRepo.save(restaurant);
};
