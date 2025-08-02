import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Restaurant } from '../entities/Restaurant';
import { MenuItem } from '../entities/MenuItem';
import { Order } from '../entities/Order';
import { DeliveryAgent } from '../entities/DeliveryAgent';
import { Rating } from '../entities/Rating';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_db_user',
  password: 'your_db_password',
  database: 'food_delivery',
  synchronize: true,
  logging: false,
  entities: [User, Restaurant, MenuItem, Order, DeliveryAgent, Rating],
});