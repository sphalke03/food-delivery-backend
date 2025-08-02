import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { Restaurant } from './Restaurant';
import { DeliveryAgent } from './DeliveryAgent';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @ManyToOne(() => Restaurant, restaurant => restaurant.orders)
  restaurant: Restaurant;

  @ManyToOne(() => DeliveryAgent, agent => agent.orders, { nullable: true })
  deliveryAgent: DeliveryAgent;

  @Column()
  status: string; // pending, accepted, delivered
}