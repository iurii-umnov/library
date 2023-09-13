import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BookConfig } from 'src/book/book.config';

export class CreateBookDto {
  @ApiProperty({ example: 'Test Book Title', description: 'title' })
  @IsString()
  @MaxLength(BookConfig.MAX_TITLE_LENGTH)
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Author A.A.', description: 'author' })
  @IsString()
  @MaxLength(BookConfig.MAX_AUTHOR_LENGTH)
  @MinLength(BookConfig.MIN_AUTHOR_LENGTH)
  @IsNotEmpty()
  author: string;
}
