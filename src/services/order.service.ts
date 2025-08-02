import { AppDataSource } from "../utils/db";
import { Order } from "../entities/Order";

export const getOrders = async () => {
  return await AppDataSource.getRepository(Order).find();
};

export const getOrderById = async (id: number) => {
  return await AppDataSource.getRepository(Order).findOneBy({ id });
};
