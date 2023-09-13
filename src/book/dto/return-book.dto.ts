import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnBookDto {
  @ApiProperty({ example: 'testUsername', description: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;
}
