import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from './MenuItem';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isOnline: boolean; // Used to filter online restaurants

  @OneToMany(() => MenuItem, (item) => item.restaurant)
  menu: MenuItem[];
}
