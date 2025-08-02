import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "../order/order.entity";

@Entity()
export class DeliveryAgent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => Order, (order) => order.deliveryAgent)
  orders: Order[];
}
