import { Request, Response } from "express";
import { DeliveryService } from "../services/delivery.service";

const deliveryService = new DeliveryService();

export class DeliveryController {
  static async updateDeliveryStatus(req: Request, res: Response) {
    const { orderId, status } = req.body;
    try {
      const result = await deliveryService.updateDeliveryStatus(orderId, status);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
