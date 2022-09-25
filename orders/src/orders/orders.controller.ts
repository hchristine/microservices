import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CREATE_ORDER,
  GET_ORDER_BY_QUERY,
  CreateOrderFullDto,
  GetOrderByQuery,
} from 'microservices-hk-common';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern(CREATE_ORDER)
  create(dto: CreateOrderFullDto) {
    return this.ordersService.create(dto);
  }

  @MessagePattern(GET_ORDER_BY_QUERY)
  get(dto: GetOrderByQuery) {
    return this.ordersService.get(dto);
  }
}
