// ../delivery-agent-service/entities/DeliveryAgent.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DeliveryAgent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ default: 'idle' })
  status: string; // idle, delivering, unavailable
}