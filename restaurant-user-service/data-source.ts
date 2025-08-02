import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Restaurant } from './entities/Restaurant';
import { MenuItem } from './entities/MenuItem';
import { Rating } from './entities/Rating';

// Setup DB connection using environment variables
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true, // auto-creates tables in dev
  logging: true,
  entities: [Restaurant, MenuItem, Rating], // register entity classes
});
