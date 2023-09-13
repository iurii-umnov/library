import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: new Date().toDateString() })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @CreateDateColumn({ select: false })
  dt: Date;

  @ManyToOne(() => User, (user) => user.subscription, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
