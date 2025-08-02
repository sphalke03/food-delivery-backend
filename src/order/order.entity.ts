import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "../user/user.entity";
import { Restaurant } from "../restaurant/restaurant.entity";
// src/order/order.entity.ts
import { DeliveryAgent } from '../delivery-agent/deliveryAgent.entity'; 
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Restaurant;

  @ManyToOne(() => DeliveryAgent)
  @JoinColumn({ name: "delivery_agent_id" })
  deliveryAgent: DeliveryAgent;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;
}
