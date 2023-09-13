import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from '../entities/book.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) { }

  async create(title: string, author: string): Promise<Book> {
    const book = this.bookRepository.save({
      title,
      author,
    });
    return book;
  }

  async findAll(skip: number, limit: number): Promise<[Book[], number]> {
    const queryBuilder = this.bookRepository
      .createQueryBuilder('book')
      .orderBy('book.title', 'ASC')
      .skip(skip)
      .take(limit);
    const { entities } = await queryBuilder.getRawAndEntities();
    const itemCount = await queryBuilder.getCount();
    return [entities, itemCount];
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
    });
    return book;
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
