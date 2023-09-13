import { Injectable, Inject } from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import {
  InvalidName,
  InvalidUsername,
  UsernameExists,
  UserNotFound,
} from 'src/shared/enums/errors.enum';
import { BaseApiException } from 'src/shared/responses/exception.response';

@Injectable()
export class UserValidator {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) { }

  async validateUsername(username: string): Promise<string> {
    /* 
      Username must:
      - be unique
      - consist of only letters and digits
      - start with letter
    */
    const user = await this.userRepository.getUserByUsername(username);
    if (user) {
      throw new BaseApiException(UsernameExists);
    }
    if (!/^[A-Za-z0-9]*$/.test(username) || /^\d+$/.test(username[0])) {
      throw new BaseApiException(InvalidUsername);
    }
    return username;
  }

  validateName(name: string): string {
    /* 
      Name must:
      - consist of only letters and spaces
      - not have double spaces
      - be title styled
    */
    name = name.trim().replace(/ +(?= )/g, '');
    if (!/\S/.test(name)) {
      throw new BaseApiException(InvalidName);
    }
    const nameArray = name.split(' ').map((el) => {
      return el[0].toUpperCase() + el.slice(1).toLowerCase();
    });
    return nameArray.join(' ');
  }

  validatePhone(phone: string): string {
    /* 
      Phone must be standardized to RU format, beginning with 7
    */
    phone = phone.replace(/[^0-9]/g, '');
    if (phone.length === 10) return '7' + phone;
    return phone;
  }

  // Check if there is user with specified username
  async validateUserExistence(username: string): Promise<User> {
    const user = await this.userRepository.getUserByUsername(username);
    if (!user) {
      throw new BaseApiException(UserNotFound);
    }
    return user;
  }
}
