import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MenuItem } from "./menu-items.entity";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  cuisine: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant)
  menuItems: MenuItem[];
}
