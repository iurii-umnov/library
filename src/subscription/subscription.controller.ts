import {
  ApiTags,
  ApiBody,
  ApiOperation,
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
} from '@nestjs/common';

import { Subscription } from './entities/subscription.entity';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { PageDto } from 'src/shared/dto/page.dto';
import { PageOptionsDto } from 'src/shared/dto/page-options.dto';

@Controller('subscription')
@ApiTags('Subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Post()
  @ApiBody({ type: CreateSubscriptionDto })
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: 'Register new subscription',
    description:
      "<b>Input Body</b><br><br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      - <b>endDate</b>: <i>Date</i> - subscription expiration date (YYYY-MM-DD)<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>id</b>: <i>number</i> - subscription id in the system<br>\
      - <b>startDate</b>: <i>Date</i> - subscription start date (YYYY-MM-DD) (today's date)<br>\
      - <b>endDate</b>: <i>Date</i> - subscription expiration date (YYYY-MM-DD)<br>\
      - <b>user</b>: <i>User</i> - user who owns subscription<br>\
      - <b>dt</b>: <i>Date</i> - timestamp\
      <br><br>\
      <b>User</b><br><br>\
      - <b>id</b>: <i>number</i> - user id in the system<br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - user real name<br>\
      - <b>birthday</b>: <i>Date</i> - date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - user RU phone contact",
  })
  @ApiCreatedResponse({
    status: 201,
    description: 'Subscription Successfully Created',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Validation Error',
  })
  async create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    return await this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get list of all active subscriptions',
    description:
      '<b>Output Body</b><br><br>\
      - <b>data</b>: <i>Subscription[]</i> - list of subscriptions<br>\
      - <b>meta</b>: <i>Meta[]</i> - pagination meta data<br>\
      <br><br>\
      <b>Subscription</b><br><br>\
      - <b>id</b>: <i>number</i> - subscription id in the system<br>\
      - <b>startDate</b>: <i>Date</i> - subscription start date (YYYY-MM-DD)<br>\
      - <b>endDate</b>: <i>Date</i> - subscription expiration date (YYYY-MM-DD)<br>\
      - <b>user</b>: <i>User</i> - user who owns subscription<br>\
      <br><br>\
      <b>Meta</b><br><br>\
      - <b>page</b>: <i>string</i> - catalog page number<br>\
      - <b>itemsPerPage</b>: <i>string</i> - items per catalog page<br>\
      - <b>itemsCount</b>: <i>number</i> - total number of items<br>\
      - <b>pageCount</b>: <i>number</i> - total number of pages<br>\
      - <b>hasPreviousPage</b>: <i>boolean</i> - idicator if previous page exists<br>\
      - <b>hasNextPage</b>: <i>boolean</i> - idicator if next page exists<br>\
      <br><br>\
      <b>User</b><br><br>\
      - <b>id</b>: <i>number</i> - user id in the system<br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - user real name<br>\
      - <b>birthday</b>: <i>Date</i> - date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - user RU phone contact',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Subscriptions Successfully Received',
  })
  async findAllActive(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Subscription>> {
    return await this.subscriptionService.findAllActive(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get subscription by id',
    description:
      '<b>URL Params</b><br><br>\
      - <b>id</b>: <i>number</i> - subscription id in the system<br>\
      <br><br>\
      <b>Output Body</b><br><br>\
      - <b>id</b>: <i>number</i> - subscription id in the system<br>\
      - <b>startDate</b>: <i>Date</i> - subscription start date (YYYY-MM-DD)<br>\
      - <b>endDate</b>: <i>Date</i> - subscription expiration date (YYYY-MM-DD)<br>\
      - <b>user</b>: <i>User</i> - user who owns subscription<br>\
      <br><br>\
      <b>User</b><br><br>\
      - <b>id</b>: <i>number</i> - user id in the system<br>\
      - <b>username</b>: <i>string</i> - unique name of the user in the system<br>\
      - <b>name</b>: <i>string</i> - user real name<br>\
      - <b>birthday</b>: <i>Date</i> - date of birth (YYYY-MM-DD)<br>\
      - <b>phone</b>: <i>string</i> - user RU phone contact',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Subscription Successfully Received',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  async findOne(@Param('id') id: string): Promise<Subscription> {
    return await this.subscriptionService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete subscription',
    description:
      '<b>URL Params</b><br><br>\
      - <b>id</b>: <i>number</i> - subscription id in the system',
  })
  @ApiOkResponse({
    status: 200,
    description: 'Subscription Successfully Deleted',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Invalid Input Data',
  })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.subscriptionService.delete(+id);
  }
}
