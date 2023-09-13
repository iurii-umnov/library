import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from './entities/book.entity';
import { BookRepository } from './repositories/book.repository';
import { BookValidator } from './book.validation';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Rent } from './entities/rent.entity';
import { RentRepository } from './repositories/rent.repository';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserValidator } from 'src/user/user.validation';
import { Subscription } from 'src/subscription/entities/subscription.entity';
import { SubscriptionRepository } from 'src/subscription/subscription.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Rent, User, Subscription])],
  controllers: [BookController],
  providers: [
    BookRepository,
    BookService,
    RentRepository,
    UserRepository,
    BookValidator,
    UserValidator,
    SubscriptionRepository,
  ],
})
export class BookModule { }
