import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "./user.entity";
import { Restaurant } from "../restaurant/restaurant.entity";
import { MenuItem } from '../restaurant/menu-items.entity';
import { Order } from "../order/order.entity";
import { OrderItem } from "../order/order-item.entity";
import { DeliveryAgent } from "../delivery-agent/deliveryAgent.entity";



// Place Order controller
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, restaurantId, items } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const restaurantRepo = AppDataSource.getRepository(Restaurant);
    const menuRepo = AppDataSource.getRepository(MenuItem);
    const orderRepo = AppDataSource.getRepository(Order);
    const orderItemRepo = AppDataSource.getRepository(OrderItem);
    const agentRepo = AppDataSource.getRepository(DeliveryAgent);

    const user = await userRepo.findOneBy({ id: userId });
    const restaurant = await restaurantRepo.findOneBy({ id: restaurantId });

    if (!user || !restaurant) {
      return res.status(404).json({ message: "User or Restaurant not found" });
    }

    const deliveryAgent = await agentRepo.findOneBy({ isAvailable: true });
    if (!deliveryAgent) {
      return res.status(400).json({ message: "No delivery agent available" });
    }

    const order = new Order();
    order.user = user;
    order.restaurant = restaurant;
    order.deliveryAgent = deliveryAgent;
    order.totalAmount = 0;
    order.status = "placed";
    await orderRepo.save(order);

    let totalAmount = 0;

    for (const item of items) {
      const menuItem = await menuRepo.findOneBy({ id: item.menuItemId });
      if (!menuItem) continue;

      const orderItem = new OrderItem();
      orderItem.order = order;
      orderItem.menuItem = menuItem;
      orderItem.quantity = item.quantity;
      orderItem.price = menuItem.price * item.quantity;

      totalAmount += orderItem.price;
      await orderItemRepo.save(orderItem);
    }

    order.totalAmount = totalAmount;
    await orderRepo.save(order);

    deliveryAgent.isAvailable = false;
    await agentRepo.save(deliveryAgent);

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: order.id,
      totalAmount,
      assignedAgent: deliveryAgent.name,
    });
  } catch (error) {
    console.error("Place Order Error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
