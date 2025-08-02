import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { MenuItem } from '../restaurant/menu-items.entity';


@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @ManyToOne(() => MenuItem)
  @JoinColumn({ name: "menu_item_id" })
  menuItem: MenuItem;

  @Column()
  quantity: number;
}
