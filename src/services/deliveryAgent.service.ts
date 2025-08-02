// src/services/deliveryAgent.service.ts
import { AppDataSource } from '../data-source';
import { DeliveryAgent } from '../delivery-agent/deliveryAgent.entity';

const repository = AppDataSource.getRepository(DeliveryAgent);

export const createAgent = async (data: Partial<DeliveryAgent>) => {
  const agent = repository.create(data);
  return await repository.save(agent);
};

export const getAllAgents = async () => {
  return await repository.find();
};

export const getAgentById = async (id: number) => {
  return await repository.findOneBy({ id });
};

export const updateAgent = async (id: number, data: Partial<DeliveryAgent>) => {
  await repository.update(id, data);
  return await getAgentById(id);
};

export const deleteAgent = async (id: number) => {
  return await repository.delete(id);
};
