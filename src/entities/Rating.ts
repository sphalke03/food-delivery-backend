import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column({ nullable: true })
  orderId: string;

  @Column({ nullable: true })
  agentId: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn()
  timestamp: Date;
}