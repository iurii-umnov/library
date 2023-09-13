import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validation';
import { Rent } from 'src/book/entities/rent.entity';
import { RentRepository } from 'src/book/repositories/rent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rent])],
  controllers: [UserController],
  providers: [UserRepository, RentRepository, UserService, UserValidator],
})
export class UserModule {}
