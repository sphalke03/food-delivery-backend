// ../delivery-agent-service/controllers/deliveryController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { DeliveryAgent } from '../entities/DeliveryAgent';

export const createAgent = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const agent = AppDataSource.getRepository(DeliveryAgent).create({ name });
    const result = await AppDataSource.getRepository(DeliveryAgent).save(agent);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create delivery agent' });
  }
};

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isAvailable, currentStatus } = req.body;
    const agentRepo = AppDataSource.getRepository(DeliveryAgent);
    const agent = await agentRepo.findOneBy({ id: parseInt(id) });

    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    agent.isAvailable = isAvailable;
    agent.currentStatus = currentStatus;
    await agentRepo.save(agent);

    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update agent status' });
  }
};

export const getAllAgents = async (_req: Request, res: Response) => {
  try {
    const agents = await AppDataSource.getRepository(DeliveryAgent).find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
};