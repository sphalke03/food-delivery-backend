import { AppDataSource } from "../data-source";
import { User } from "./user.entity";
import { Restaurant } from "../restaurant/restaurant.entity";
import { MenuItem } from "../restaurant/menu-items.entity";
import { Order } from "../order/order.entity";
import { OrderItem } from "../order/order-item.entity";
import { DeliveryAgent } from "../delivery-agent/deliveryAgent.entity";

export const placeOrder = async (userId: number, restaurantId: number, items: { menuItemId: number; quantity: number; }[]) => {
  const userRepo = AppDataSource.getRepository(User);
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const menuItemRepo = AppDataSource.getRepository(MenuItem);
  const orderRepo = AppDataSource.getRepository(Order);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);
  const deliveryAgentRepo = AppDataSource.getRepository(DeliveryAgent);

  const user = await userRepo.findOneByOrFail({ id: userId });
  const restaurant = await restaurantRepo.findOneByOrFail({ id: restaurantId });

  const deliveryAgent = await deliveryAgentRepo.findOneBy({ isAvailable: true });
  if (!deliveryAgent) throw new Error("No available delivery agents");

  const order = new Order();
  order.user = user;
  order.restaurant = restaurant;
  order.deliveryAgent = deliveryAgent;
  order.orderTime = new Date();
  order.status = "Pending";

  const savedOrder = await orderRepo.save(order);

  for (const item of items) {
    const menuItem = await menuItemRepo.findOneByOrFail({ id: item.menuItemId });
    const orderItem = new OrderItem();
    orderItem.order = savedOrder;
    orderItem.menuItem = menuItem;
    orderItem.quantity = item.quantity;
    await orderItemRepo.save(orderItem);
  }

  deliveryAgent.isAvailable = false;
  await deliveryAgentRepo.save(deliveryAgent);

  return savedOrder;
};
