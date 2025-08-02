import { Request, Response } from 'express';
import * as orderService from '../services/order.service';

export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
};

// -------------------
// 📁 controllers/delivery.controller.ts
import { Request, Response } from 'express';
import * as deliveryService from '../services/delivery.service';

export const updateDeliveryStatus = async (req: Request, res: Response) => {
  const result = await deliveryService.updateDeliveryStatus(req.body);
  res.json(result);
};