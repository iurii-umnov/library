import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(
    username: string,
    name: string,
    phone: string,
    birthday: Date,
  ): Promise<User> {
    const user = this.userRepository.save({
      username,
      name,
      phone,
      birthday,
    });
    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user;
  }

  async findAll(skip: number, limit: number): Promise<[User[], number]> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .orderBy('user.name', 'ASC')
      .skip(skip)
      .take(limit);
    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    return [entities, itemCount];
  }

  async update(username: string, data: UpdateUserDto): Promise<void> {
    const user = await this.getUserByUsername(username);
    await this.userRepository.update(user.id, data);
  }

  async delete(username: string): Promise<void> {
    const user = await this.getUserByUsername(username);
    if (user) await this.userRepository.delete(user.id);
  }
}
