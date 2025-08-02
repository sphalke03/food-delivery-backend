import { AppDataSource } from "../utils/db";
import { Restaurant } from "../entities/Restaurant";
import { MenuItem } from '../restaurant/menu-items.entity';
import { Order } from "../entities/Order";
import { DeliveryAgent } from "../entities/DeliveryAgent";

export const updateMenu = async (restaurantId: number, menu: MenuItem[]) => {
  const repo = AppDataSource.getRepository(MenuItem);
  for (const item of menu) {
    await repo.save({ ...item, restaurantId });
  }
  return repo.find({ where: { restaurantId } });
};

export const updateStatus = async (restaurantId: number, isOnline: boolean) => {
  const repo = AppDataSource.getRepository(Restaurant);
  await repo.update(restaurantId, { isOnline });
  return repo.findOneBy({ id: restaurantId });
};

export const processOrder = async (orderId: number, accept: boolean) => {
  const repo = AppDataSource.getRepository(Order);
  if (accept) {
    const agents = await AppDataSource.getRepository(DeliveryAgent)
      .createQueryBuilder("agent")
      .where("agent.isAvailable = true")
      .getOne();

    if (!agents) throw new Error("No delivery agents available");

    await repo.update(orderId, {
      status: "ACCEPTED",
      deliveryAgentId: agents.id,
    });

    await AppDataSource.getRepository(DeliveryAgent).update(agents.id, {
      isAvailable: false,
    });

    return repo.findOneBy({ id: orderId });
  } else {
    await repo.update(orderId, { status: "REJECTED" });
    return { message: "Order rejected" };
  }
};
