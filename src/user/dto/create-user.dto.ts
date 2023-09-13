import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsMobilePhone,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { UserConfig } from '../user.config';

export class CreateUserDto {
  @ApiProperty({ example: 'testUsername', description: 'username' })
  @IsString()
  @MaxLength(UserConfig.MAX_USERNAME_LENGTH)
  @MinLength(UserConfig.MIN_USERNAME_LENGTH)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Test Name Here', description: 'name' })
  @IsString()
  @MaxLength(UserConfig.MAX_NAME_LENGTH)
  @MinLength(UserConfig.MIN_NAME_LENGTH)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1970-01-01', description: 'birthday' })
  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @ApiProperty({ example: '79854323322', description: 'phone' })
  @IsMobilePhone('ru-RU')
  @IsNotEmpty()
  phone: string;
}
