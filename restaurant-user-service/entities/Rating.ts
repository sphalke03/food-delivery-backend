import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurantId: number;

  @Column()
  userId: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string; // Optional comment field
}
