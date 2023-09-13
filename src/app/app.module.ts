import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { SubscriptionModule } from '../subscription/subscription.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    UserModule,
    BookModule,
    SubscriptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
