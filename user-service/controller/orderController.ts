// ../user-service/controllers/orderController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { User } from '../entities/User';

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, restaurantId, items } = req.body;
    const user = await AppDataSource.getRepository(User).findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const order = new Order();
    order.restaurantId = restaurantId;
    order.status = 'placed';
    order.user = user;

    const savedOrder = await AppDataSource.manager.save(order);

    const orderItems = items.map((item: any) => {
      const orderItem = new OrderItem();
      orderItem.name = item.name;
      orderItem.price = item.price;
      orderItem.quantity = item.quantity;
      orderItem.order = savedOrder;
      return orderItem;
    });

    await AppDataSource.manager.save(orderItems);
    res.status(201).json({ order: savedOrder, items: orderItems });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await AppDataSource.getRepository(Order).find({
      where: { user: { id: parseInt(userId) } },
      relations: ['items', 'user'],
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};