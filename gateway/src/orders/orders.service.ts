import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto, CREATE_ORDER } from 'microservices-hk-common';
import { ORDERS_SVC } from './constants';

@Injectable()
export class OrdersService {
  constructor(@Inject(ORDERS_SVC) private readonly ordersProxy: ClientProxy) {}

  create(userId: number, dto: CreateOrderDto) {
    return this.ordersProxy.send(CREATE_ORDER, { userId, ...dto });
  }
}
