import { Injectable, Inject } from '@nestjs/common';

import { SubscriptionRepository } from './subscription.repository';
import { User } from 'src/user/entities/user.entity';
import { SubscriptionExists, InvalidDate } from 'src/shared/enums/errors.enum';
import { BaseApiException } from 'src/shared/responses/exception.response';
import { UserValidator } from 'src/user/user.validation';

@Injectable()
export class SubscriptionValidator {
  constructor(
    @Inject(SubscriptionRepository)
    private readonly subscriptionRepository: SubscriptionRepository,
    @Inject(UserValidator) private readonly userValidator: UserValidator,
  ) { }

  async validateUserExistence(username: string): Promise<User> {
    const user = await this.userValidator.validateUserExistence(username);
    return user;
  }

  // Check if user already has active subscription
  async validateSubscriptionExistence(user: User): Promise<void> {
    const subscription =
      await this.subscriptionRepository.getSubscriptionByUser(user);
    if (subscription) {
      throw new BaseApiException(SubscriptionExists);
    }
  }

  validateDates(endDate: Date): void {
    if (new Date(endDate) < new Date()) {
      throw new BaseApiException(InvalidDate);
    }
  }
}
