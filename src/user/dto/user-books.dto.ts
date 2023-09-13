import { Rent } from 'src/book/entities/rent.entity';
import { User } from '../entities/user.entity';

export class UserBooksDto {
  user: User;
  books: Rent[];

  constructor({ user, books }: UserBooksDto) {
    this.user = user;
    this.books = books;
  }
}
