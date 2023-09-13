import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Rent } from 'src/book/entities/rent.entity';
import { BookConfig } from 'src/book/book.config';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: BookConfig.MAX_TITLE_LENGTH })
  title: string;

  @Column({ length: BookConfig.MAX_AUTHOR_LENGTH })
  author: string;

  @CreateDateColumn({ select: false })
  dt: Date;

  @OneToMany(() => Rent, (rent) => rent.book)
  rent: Rent;
}
