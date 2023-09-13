import { Injectable, Inject } from '@nestjs/common';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserValidator } from './user.validation';
import { PageDto } from 'src/shared/dto/page.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { PageMetaDto } from 'src/shared/dto/page-meta.dto';
import { RentRepository } from 'src/book/repositories/rent.repository';
import { UserBooksDto } from './dto/user-books.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @Inject(RentRepository) private readonly rentRepository: RentRepository,
    @Inject(UserValidator) private readonly userValidator: UserValidator,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Validate input data
    createUserDto.username = await this.userValidator.validateUsername(
      createUserDto.username.toLowerCase(),
    );
    createUserDto.name = this.userValidator.validateName(createUserDto.name);
    createUserDto.phone = this.userValidator.validatePhone(createUserDto.phone);
    // Register new user
    const user = await this.userRepository.create(
      createUserDto.username,
      createUserDto.name,
      createUserDto.phone,
      createUserDto.birthday,
    );
    return user;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
    // Find all users from particular page
    const [entities, itemCount] = await this.userRepository.findAll(
      pageOptionsDto.skip,
      pageOptionsDto.itemsPerPage,
    );
    // Attach pagination meta data
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(username: string): Promise<UserBooksDto> {
    username = username.toLowerCase();
    await this.userValidator.validateUserExistence(username);
    const user = await this.userRepository.getUserByUsername(username);
    const books = await this.rentRepository.getUserRentedBooks(username);
    const userBooks = new UserBooksDto({ user, books });
    return userBooks;
  }

  async update(username: string, updateUserDto: UpdateUserDto): Promise<void> {
    username = username.toLowerCase();
    updateUserDto.username = updateUserDto.username.toLowerCase();
    // Validate input data
    await this.userValidator.validateUserExistence(username);
    if (username !== updateUserDto.username) {
      updateUserDto.username = await this.userValidator.validateUsername(
        updateUserDto.username,
      );
    }
    updateUserDto.name = this.userValidator.validateName(updateUserDto.name);
    updateUserDto.phone = this.userValidator.validatePhone(updateUserDto.phone);
    // Update user data
    await this.userRepository.update(username, updateUserDto);
  }

  async delete(username: string): Promise<void> {
    await this.userRepository.delete(username.toLowerCase());
  }
}
