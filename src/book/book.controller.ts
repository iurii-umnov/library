import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';

import { Book } from './entities/book.entity';
import { Rent } from './entities/rent.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { RentBookDto } from './dto/rent-book.dto';
import { PageDto } from 'src/shared/dto/page.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Controller('book')
@ApiTags('Books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  @ApiBody({ type: CreateBookDto })
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Register new book',
    description:
      '<b>Input Body</b><br><br>\
      - <b>title</b>: <i>string</i> - book title<br>\
      - <b>author</b>: <i>string</i> - book author/authors<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system<br>\
      - <b>title</b>: <i>string</i> - book title<br>\
      - <b>author</b>: <i>string</i> - book author/authors<br>\
      - <b>dt</b>: <i>Date</i> - timestamp',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Book Successfully Created',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Validation Error',
  })
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.create(createBookDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of all books',
    description:
      '<b>Query Params</b><br><br>\
      - <b>page</b>: <i>number</i> - catalog page number<br>\
      - <b>itemsPerPage</b>: <i>number</i> - items per catalog page<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>data</b>: <i>Book[]</i> - list of books<br>\
      - <b>meta</b>: <i>Meta[]</i> - pagination meta data<br>\
      <br><br>\
      <b>Book</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system<br>\
      - <b>title</b>: <i>string</i> - book title<br>\
      - <b>author</b>: <i>string</i> - book author/authors<br>\
      <br><br>\
      <b>Meta</b><br><br>\
      - <b>page</b>: <i>string</i> - catalog page number<br>\
      - <b>itemsPerPage</b>: <i>string</i> - items per catalog page<br>\
      - <b>itemsCount</b>: <i>number</i> - total number of items<br>\
      - <b>pageCount</b>: <i>number</i> - total number of pages<br>\
      - <b>hasPreviousPage</b>: <i>boolean</i> - idicator if previous page exists<br>\
      - <b>hasNextPage</b>: <i>boolean</i> - idicator if next page exists',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Books Successfully Received',
  })
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Book>> {
    return await this.bookService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get book by id',
    description:
      '<b>URL Params</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system<br>\
      - <b>title</b>: <i>string</i> - book title<br>\
      - <b>author</b>: <i>string</i> - book author/authors',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Book Successfully Received',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  async findOne(@Param('id') id: string): Promise<Book> {
    return await this.bookService.findOne(+id);
  }

  @Post(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Rent the book',
    description:
      "<b>URL Params</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system<br>\
      <br><br>\
      <b>Input Body</b><br><br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      - <b>endDate</b>: <i>string</i> - rent expiration date (YYYY-MM-DD)<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>id</b>: <i>number</i> - rent id in the system<br>\
      - <b>startDate</b>: <i>Date</i> - rent start date (YYYY-MM-DD) (today's date)<br>\
      - <b>endDate</b>: <i>Date</i> - rent expiration date (YYYY-MM-DD)<br>\
      - <b>isReturned</b>: <i>User</i> - indicator if book is returned<br>\
      - <b>user</b>: <i>User</i> - user who rents the book<br>\
      - <b>book</b>: <i>Book</i> - rented book<br>\
      - <b>dt</b>: <i>Date</i> - timestamp<br>\
      <br><br>\
      <b>User</b><br><br>\
      - <b>id</b>: <i>number</i> - user id in the system<br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - user real name<br>\
      - <b>birthday</b>: <i>Date</i> - date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - user RU phone contact<br>\
      <br><br>\
      <b>Book</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system<br>\
      - <b>title</b>: <i>string</i> - book title<br>\
      - <b>author</b>: <i>string</i> - book author/authors",
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Book Successfully Rented',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Validation Error',
  })
  async rent(
    @Param('id') id: string,
    @Body() rentBookDto: RentBookDto,
  ): Promise<Rent> {
    return await this.bookService.rent(+id, rentBookDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Return book',
    description:
      '<b>URL Params</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system<br>\
      <br><br>\
      <b>Input Body</b><br><br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Book Successfully Returned',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  async returnBook(
    @Param('id') id: string,
    @Body() returnBookDto: ReturnBookDto,
  ): Promise<void> {
    return await this.bookService.returnBook(+id, returnBookDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete book',
    description:
      '<b>URL Params</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Book Successfully Deleted',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.bookService.delete(+id);
  }
}
