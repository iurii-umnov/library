import { Injectable, Inject } from '@nestjs/common';

import { Book } from './entities/book.entity';
import { BookRepository } from './repositories/book.repository';
import { RentRepository } from './repositories/rent.repository';
import { Rent } from './entities/rent.entity';
import { BookConfig } from './book.config';
import { User } from 'src/user/entities/user.entity';
import { UserValidator } from 'src/user/user.validation';
import { SubscriptionRepository } from 'src/subscription/subscription.repository';
import {
  BookNotFound,
  TooManyBooksRented,
  InvalidDate,
  BookNotAvailable,
  SubscriptionNotFound,
  RentNotFound,
} from 'src/shared/enums/errors.enum';
import { BaseApiException } from 'src/shared/responses/exception.response';

@Injectable()
export class BookValidator {
  constructor(
    @Inject(BookRepository) private readonly bookRepository: BookRepository,
    @Inject(RentRepository) private readonly rentRepository: RentRepository,
    @Inject(SubscriptionRepository)
    private readonly subscriptionRepository: SubscriptionRepository,
    @Inject(UserValidator) private readonly userValidator: UserValidator,
  ) { }

  validateTitle(title: string): string {
    /*
      Title must:
      - not have double spaces
      - be title styles
    */
    title = title.trim().replace(/ +(?= )/g, '');
    const titleArray = title.split(' ').map((el) => {
      return el[0].toUpperCase() + el.slice(1).toLowerCase();
    });
    return titleArray.join(' ');
  }

  validateAuthor(author: string): string {
    /*
      Author must:
      - not have double spaces
    */
    return author.trim().replace(/ +(?= )/g, '');
  }

  async validateUserExistence(username: string): Promise<User> {
    const user = await this.userValidator.validateUserExistence(username);
    return user;
  }

  // Check if book already exists
  async validateBookExistence(id: number): Promise<Book> {
    const book = await this.bookRepository.getBookById(id);
    if (!book) {
      throw new BaseApiException(BookNotFound);
    }
    return book;
  }

  // Check if book is currently rented
  async validateBookAvailability(book: Book): Promise<void> {
    const isAvailable = await this.rentRepository.isBookAvailable(book);
    if (!isAvailable) {
      throw new BaseApiException(BookNotAvailable);
    }
  }

  // Check if user has reached the limit of simultaneously rented books
  async validateCurrentBookNumber(user: User): Promise<void> {
    const bookCount = await this.rentRepository.countUserBooks(user);
    if (bookCount >= BookConfig.MAX_RENTED_BOOKS) {
      throw new BaseApiException(TooManyBooksRented);
    }
  }

  validateDate(endDate: Date): void {
    if (new Date(endDate) < new Date()) {
      throw new BaseApiException(InvalidDate);
    }
  }

  // Check if user has subscription to rent books
  async validateSubscription(user: User): Promise<void> {
    const subscription =
      await this.subscriptionRepository.getSubscriptionByUser(user);
    if (!subscription) {
      throw new BaseApiException(SubscriptionNotFound);
    }
  }

  // Check if specified user is currently holding the specified book
  async validateRentExistence(user: User, book: Book): Promise<Rent> {
    const rent = await this.rentRepository.getRentByUserAndBook(user, book);
    if (!rent) {
      throw new BaseApiException(RentNotFound);
    }
    return rent;
  }
}
