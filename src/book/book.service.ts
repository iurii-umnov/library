import { Injectable, Inject } from '@nestjs/common';

import { Book } from './entities/book.entity';
import { Rent } from './entities/rent.entity';
import { BookRepository } from './repositories/book.repository';
import { RentRepository } from './repositories/rent.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { RentBookDto } from './dto/rent-book.dto';
import { BookValidator } from './book.validation';
import { BookNotFound } from 'src/shared/enums/errors.enum';
import { ReturnBookDto } from './dto/return-book.dto';
import { BaseApiException } from 'src/shared/responses/exception.response';
import { PageDto } from 'src/shared/dto/page.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { PageMetaDto } from 'src/shared/dto/page-meta.dto';

@Injectable()
export class BookService {
  constructor(
    @Inject(BookRepository) private readonly bookRepository: BookRepository,
    @Inject(RentRepository) private readonly rentRepository: RentRepository,
    @Inject(BookValidator)
    private readonly bookValidator: BookValidator,
  ) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    // Validate input data
    const title = this.bookValidator.validateTitle(createBookDto.title);
    const author = this.bookValidator.validateAuthor(createBookDto.author);
    // Register new book
    const book = await this.bookRepository.create(title, author);
    return book;
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Book>> {
    // Find all available books from particular page
    const [entities, itemCount] = await this.bookRepository.findAll(
      pageOptionsDto.skip,
      pageOptionsDto.itemsPerPage,
    );
    // Attach pagination meta data
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.getBookById(id);
    if (!book) {
      throw new BaseApiException(BookNotFound);
    }
    return book;
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async rent(id: number, rentBookDto: RentBookDto): Promise<Rent> {
    // Validate input data
    const user = await this.bookValidator.validateUserExistence(
      rentBookDto.username.toLowerCase(),
    );
    await this.bookValidator.validateSubscription(user);
    await this.bookValidator.validateCurrentBookNumber(user);
    const book = await this.bookValidator.validateBookExistence(id);
    await this.bookValidator.validateBookAvailability(book);
    this.bookValidator.validateDate(rentBookDto.endDate);
    // Rent the book
    const rent = await this.rentRepository.create(
      user,
      book,
      rentBookDto.endDate,
    );
    return rent;
  }

  async returnBook(id: number, returnBookDto: ReturnBookDto): Promise<void> {
    // Validate input data
    const user = await this.bookValidator.validateUserExistence(
      returnBookDto.username.toLowerCase(),
    );
    const book = await this.bookValidator.validateBookExistence(id);
    const rent = await this.bookValidator.validateRentExistence(user, book);
    // Mark that book is returned
    await this.rentRepository.returnBook(rent.id);
  }
}
