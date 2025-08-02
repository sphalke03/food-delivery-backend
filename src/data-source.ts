// data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dbConfig } from './config/db.config';
import { Restaurant } from './entities/Restaurant';
import { MenuItem } from './entities/MenuItem';
import { Rating } from './entities/Rating';

// Note: Only restaurant-user-service-specific entities are imported here to maintain microservice boundaries.

export const AppDataSource = new DataSource({
  ...dbConfig,
  entities: [Restaurant, MenuItem, Rating],
  migrations: [],
  subscribers: [],
});