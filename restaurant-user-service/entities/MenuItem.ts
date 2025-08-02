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

  @Column()
  available: boolean; // Indicates if the item is available to order

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
  restaurant: Restaurant;
}
