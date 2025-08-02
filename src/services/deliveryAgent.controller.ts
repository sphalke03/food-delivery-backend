// src/controllers/deliveryAgent.controller.ts
import { Request, Response } from 'express';
import {
  createAgent,
  getAllAgents,
  getAgentById,
  updateAgent,
  deleteAgent,
} from '../services/deliveryAgent.service';

export const create = async (req: Request, res: Response) => {
  const agent = await createAgent(req.body);
  res.status(201).json(agent);
};

export const getAll = async (_req: Request, res: Response) => {
  const agents = await getAllAgents();
  res.json(agents);
};

export const getOne = async (req: Request, res: Response) => {
  const agent = await getAgentById(Number(req.params.id));
  if (!agent) return res.status(404).json({ message: 'Agent not found' });
  res.json(agent);
};

export const update = async (req: Request, res: Response) => {
  const agent = await updateAgent(Number(req.params.id), req.body);
  res.json(agent);
};

export const remove = async (req: Request, res: Response) => {
  await deleteAgent(Number(req.params.id));
  res.status(204).send();
};
