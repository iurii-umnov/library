import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { Subscription } from 'src/subscription/entities/subscription.entity';
import { Rent } from 'src/book/entities/rent.entity';
import { UserConfig } from 'src/user/user.config';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: UserConfig.MAX_USERNAME_LENGTH, unique: true })
  username: string;

  @Column({ length: UserConfig.MAX_NAME_LENGTH })
  name: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  phone: string;

  @CreateDateColumn({ select: false })
  dt: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscription: Subscription;

  @OneToMany(() => Rent, (rent) => rent.user)
  rent: Rent;
}
