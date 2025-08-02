// entities/Restaurant.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from './MenuItem';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  openHour: number;

  @Column()
  closeHour: number;

  @OneToMany(() => MenuItem, (item) => item.restaurant)
  menu: MenuItem[];
}