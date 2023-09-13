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
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';

import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserBooksDto } from './dto/user-books.dto';
import { PageDto } from 'src/shared/dto/page.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Register new user',
    description:
      '<b>Input Body</b><br><br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - user real name<br>\
      - <b>birthday</b>: <i>Date</i> - date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - user RU phone contact<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>id</b>: <i>number</i> - user id in the system<br>\
      - <b>username</b>: <i>string</i> - stardardized unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - stardardized user real name<br>\
      - <b>birthday</b>: <i>Date</i> - date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - stardardized user RU phone contact<br>\
      - <b>dt</b>: <i>Date</i> - timestamp',
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'User Successfully Created',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Validation Error',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get(':username')
  @ApiOperation({
    summary: 'Get user with all rented books',
    description:
      '<b>URL Params</b><br><br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>id</b>: <i>number</i> - user id in the system<br>\
      - <b>username</b>: <i>string</i> - stardardized unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - stardardized user real name<br>\
      - <b>birthday</b>: <i>Date</i> - date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - stardardized user RU phone contact<br>\
      - <b>books</b>: <i>Book[]</i> - list of user rented books<br>\
      <br><br>\
      <b>Book</b><br><br>\
      - <b>id</b>: <i>number</i> - book id in the system<br>\
      - <b>title</b>: <i>string</i> - book title<br>\
      - <b>author</b>: <i>string</i> - book author/authors',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User Successfully Received',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  async findOne(@Param('username') username: string): Promise<UserBooksDto> {
    return await this.userService.findOne(username);
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of all users',
    description:
      '<b>Query Params</b><br><br>\
      - <b>page</b>: <i>number</i> - catalog page number<br>\
      - <b>itemsPerPage</b>: <i>number</i> - items per catalog page<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>data</b>: <i>User[]</i> - list of users<br>\
      - <b>meta</b>: <i>Meta[]</i> - pagination meta data<br>\
      <br><br>\
      <b>User</b><br><br>\
      - <b>id</b>: <i>number</i> - user id in the system<br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - user real name<br>\
      - <b>birthday</b>: <i>Date</i> - date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - user RU phone contact<br>\
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
    description: 'Users Successfully Received',
  })
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User>> {
    return await this.userService.findAll(pageOptionsDto);
  }

  @Put(':username')
  @ApiBody({ type: UpdateUserDto })
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: "Update client's personal data",
    description:
      '<b>URL Params</b><br><br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      <br><br>\
      <b>Input Body</b><br><br>\
      - <b>username</b>: <i>string</i> - new unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - new user real name<br>\
      - <b>birthday</b>: <i>Date</i> - new date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - new user RU phone contact',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User Successfully Updated',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Validation Error',
  })
  async update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return await this.userService.update(username, updateUserDto);
  }

  @Delete(':username')
  @ApiOperation({
    summary: 'Delete user',
    description:
      '<b>URL Params</b><br><br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system',
  })
  @ApiOkResponse({
    status: 200,
    description: 'User Successfully Deleted',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  async delete(@Param('username') username: string): Promise<void> {
    return await this.userService.delete(username);
  }
}
