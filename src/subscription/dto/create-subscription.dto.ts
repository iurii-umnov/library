import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserConfig } from 'src/user/user.config';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 'testUsername', description: 'username' })
  @IsString()
  @MaxLength(UserConfig.MAX_USERNAME_LENGTH)
  @MinLength(UserConfig.MIN_USERNAME_LENGTH)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '2024-01-31', description: 'endDate' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
