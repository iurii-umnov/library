import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subscription } from './entities/subscription.entity';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionValidator } from './subscription.validation';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserValidator } from 'src/user/user.validation';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User])],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionRepository,
    SubscriptionService,
    SubscriptionValidator,
    UserRepository,
    UserValidator,
  ],
})
export class SubscriptionModule { }
