import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from 'microservices-hk-common';
import { AuthRequired } from 'src/decorators/auth-required.decorator';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@AuthRequired()
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@CurrentUserId() userId: number, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto);
  }
}
