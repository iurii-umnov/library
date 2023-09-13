import { Injectable, Inject } from '@nestjs/common';

import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionValidator } from './subscription.validation';
import { SubscriptionNotFound } from 'src/shared/enums/errors.enum';
import { BaseApiException } from 'src/shared/responses/exception.response';
import { PageDto } from 'src/shared/dto/page.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { PageMetaDto } from 'src/shared/dto/page-meta.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @Inject(SubscriptionRepository)
    private readonly subscriptionRepository: SubscriptionRepository,
    @Inject(SubscriptionValidator)
    private readonly subscriptionValidator: SubscriptionValidator,
  ) { }

  async create(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    // Validate input data
    const user = await this.subscriptionValidator.validateUserExistence(
      createSubscriptionDto.username.toLowerCase(),
    );
    await this.subscriptionValidator.validateSubscriptionExistence(user);
    this.subscriptionValidator.validateDates(createSubscriptionDto.endDate);
    // Register new subscription
    const subscription = await this.subscriptionRepository.create(
      user,
      createSubscriptionDto.endDate,
    );
    return subscription;
  }

  async findAllActive(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Subscription>> {
    // Find all active subscriptions from particular page
    const [entities, itemCount] = await this.subscriptionRepository.findAll(
      pageOptionsDto.skip,
      pageOptionsDto.itemsPerPage,
    );
    // Attach pagination meta data
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<Subscription> {
    const subscription =
      await this.subscriptionRepository.getSubscriptionById(id);
    if (!subscription) {
      throw new BaseApiException(SubscriptionNotFound);
    }
    return subscription;
  }

  async delete(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
