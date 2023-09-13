import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: new Date().toDateString() })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ default: false })
  isReturned: boolean;

  @CreateDateColumn({ select: false })
  dt: Date;

  @ManyToOne(() => User, (user) => user.rent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Book, (book) => book.rent, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
