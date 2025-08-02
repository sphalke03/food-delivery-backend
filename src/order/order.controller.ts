// src/order/order.controller.ts
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../user/user.entity";
import { Restaurant } from "../restaurant/restaurant.entity";
import { MenuItem } from '../restaurant/menu-items.entity';
import { Order } from "./order.entity";
import { OrderItem } from "./order-item.entity";
import { DeliveryAgent } from "../delivery-agent/deliveryAgent.entity";

export const placeOrder = async (req: Request, res: Response) => {
  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { userId, restaurantId, items } = req.body;

    const user = await queryRunner.manager.findOne(User, { where: { id: userId } });
    const restaurant = await queryRunner.manager.findOne(Restaurant, { where: { id: restaurantId } });
    const deliveryAgent = await queryRunner.manager.findOne(DeliveryAgent, { where: { isAvailable: true } });

    if (!user || !restaurant || !deliveryAgent) {
      throw new Error("Invalid user, restaurant, or no available agent");
    }

    const order = new Order();
    order.user = user;
    order.restaurant = restaurant;
    order.deliveryAgent = deliveryAgent;
    order.totalAmount = 0;
    order.status = "placed";
    await queryRunner.manager.save(Order, order);

    let totalAmount = 0;

    for (const item of items) {
      const menuItem = await queryRunner.manager.findOne(MenuItem, { where: { id: item.menuItemId } });
      if (!menuItem) continue;

      const orderItem = new OrderItem();
      orderItem.order = order;
      orderItem.menuItem = menuItem;
      orderItem.quantity = item.quantity;
      orderItem.price = menuItem.price * item.quantity;

      totalAmount += orderItem.price;
      await queryRunner.manager.save(OrderItem, orderItem);
    }

    order.totalAmount = totalAmount;
    await queryRunner.manager.save(Order, order);

    deliveryAgent.isAvailable = false;
    await queryRunner.manager.save(DeliveryAgent, deliveryAgent);

    await queryRunner.commitTransaction();

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: order.id,
      totalAmount,
      assignedAgent: deliveryAgent.name,
    });
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Transaction Error:", error);
    return res.status(500).json({ message: "Failed to place order", error });
  } finally {
    await queryRunner.release();
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const orderRepo = AppDataSource.getRepository(Order);

    const order = await orderRepo.findOne({
      where: { id: parseInt(id) },
      relations: {
        user: true,
        restaurant: true,
        deliveryAgent: true,
        orderItems: {
          menuItem: true,
        },
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Get Order Error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};