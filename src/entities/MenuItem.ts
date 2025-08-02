// entities/MenuItem.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from './Restaurant';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
  restaurant: Restaurant;
}