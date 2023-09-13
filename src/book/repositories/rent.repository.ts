import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../entities/book.entity';
import { Rent } from '../entities/rent.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RentRepository {
  constructor(
    @InjectRepository(Rent) private readonly rentRepository: Repository<Rent>,
  ) { }

  async create(user: User, book: Book, endDate: Date): Promise<Rent> {
    const rent = this.rentRepository.save({
      user: user,
      book: book,
      endDate: endDate,
    });
    return rent;
  }

  async getUserRentedBooks(username: string): Promise<Rent[]> {
    const data = await this.rentRepository.find({
      relations: ['book'],
      where: {
        user: {
          username: username,
        },
        isReturned: false,
      },
    });
    return data;
  }

  async countUserBooks(user: User): Promise<number> {
    const bookCount = await this.rentRepository.count({
      where: {
        user,
        isReturned: false,
      },
    });
    return bookCount;
  }

  async isBookAvailable(book: Book): Promise<boolean> {
    const rented = await this.rentRepository.findOne({
      where: {
        book,
        isReturned: false,
      },
    });
    return rented ? false : true;
  }

  async getRentByUserAndBook(user: User, book: Book): Promise<Rent> {
    const rent = await this.rentRepository.findOne({
      where: {
        user,
        book,
        isReturned: false,
      },
    });
    return rent;
  }

  async returnBook(id: number): Promise<void> {
    await this.rentRepository.update(id, { isReturned: true });
  }
}
