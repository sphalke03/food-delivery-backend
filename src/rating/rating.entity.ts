// src/rating/rating.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Restaurant } from '../restaurant/restaurant.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  score: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Restaurant, restaurant => restaurant.id, { onDelete: 'CASCADE' })
  restaurant: Restaurant;
}