import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RentBookDto {
  @ApiProperty({ example: 'testUsername', description: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '2023-12-31', description: 'endDate' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
