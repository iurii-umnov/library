import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionRepository {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) { }

  async create(user: User, endDate: Date): Promise<Subscription> {
    const subscription = this.subscriptionRepository.save({
      user: user,
      endDate: endDate,
    });
    return subscription;
  }

  async findAll(
    skip: number,
    limit: number,
  ): Promise<[Subscription[], number]> {
    const queryBuilder = this.subscriptionRepository
      .createQueryBuilder('subscription')
      .where({ endDate: MoreThanOrEqual(new Date()) })
      .innerJoinAndSelect('subscription.user', 'user')
      .skip(skip)
      .take(limit);
    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    return [entities, itemCount];
  }

  async getSubscriptionById(id: number): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return subscription;
  }

  async getSubscriptionByUser(user: User): Promise<Subscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        user: user,
        endDate: MoreThanOrEqual(new Date()),
      },
    });
    return subscription;
  }

  async delete(id: number): Promise<void> {
    await this.subscriptionRepository.delete(id);
  }
}
