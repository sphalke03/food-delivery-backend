// ../user-service/controllers/userController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = AppDataSource.getRepository(User).create({ name, email });
    const result = await AppDataSource.getRepository(User).save(user);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await AppDataSource.getRepository(User).find({ relations: ['orders'] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
