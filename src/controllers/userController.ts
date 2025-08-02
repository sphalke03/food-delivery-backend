import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

export class UserController {
  static async getOnlineRestaurants(req: Request, res: Response) {
    const hour = Number(req.query.hour || new Date().getHours());
    const restaurants = await userService.getOnlineRestaurantsAt(hour);
    res.json(restaurants);
  }

  static async placeOrder(req: Request, res: Response) {
    const { userId, restaurantId, items } = req.body;
    try {
      const order = await userService.placeOrder(userId, restaurantId, items);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async rateOrder(req: Request, res: Response) {
    const { orderId, value, ratedFor } = req.body;
    const rating = await userService.rateOrder(orderId, value, ratedFor);
    res.status(201).json(rating);
  }
}
