import { AppDataSource } from "../utils/db";
import { User } from "../entities/User";
import { Order } from "../entities/Order";
import { Rating } from "../entities/Rating";
import { Restaurant } from "../entities/Restaurant";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);
  private restaurantRepository = AppDataSource.getRepository(Restaurant);
  private orderRepository = AppDataSource.getRepository(Order);
  private ratingRepository = AppDataSource.getRepository(Rating);

  async getAvailableRestaurantsByHour(hour: number) {
    return this.restaurantRepository
      .createQueryBuilder("restaurant")
      .where(":hour BETWEEN restaurant.openingHour AND restaurant.closingHour", { hour })
      .andWhere("restaurant.isOnline = true")
      .getMany();
  }

  async placeOrder(userId: number, restaurantId: number, menuItemIds: number[]) {
    const order = this.orderRepository.create({
      user: { id: userId },
      restaurant: { id: restaurantId },
      menuItems: menuItemIds.map((id) => ({ id })),
      status: "pending",
    });

    return await this.orderRepository.save(order);
  }

  async leaveRating(userId: number, orderId: number, deliveryAgentId: number, ratingValue: number) {
    const rating = this.ratingRepository.create({
      user: { id: userId },
      order: { id: orderId },
      deliveryAgent: { id: deliveryAgentId },
      value: ratingValue,
    });

    return await this.ratingRepository.save(rating);
  }
}
