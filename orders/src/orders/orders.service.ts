import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { lastValueFrom } from 'rxjs';
import {
  CHARGE_PAYMENT,
  CreateOrderFullDto,
  CREATE_NOTIFICATION,
  GetOrderByQuery,
  GET_PRODUCT_BY_ID,
  ORDER_CREATED,
} from 'microservices-hk-common';
import { TRANSPORT } from './constants';
import { Order } from './entity/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(TRANSPORT)
    private transport: ClientProxy,

    @InjectModel(Order)
    private orderModel: typeof Order,
  ) {}

  async create(dto: CreateOrderFullDto) {
    const observable = this.transport.send(GET_PRODUCT_BY_ID, {
      productId: dto.productId,
    });

    const product: { qty: number; price: number; title: string } =
      await lastValueFrom(observable);

    if (!product) {
      return {};
    }

    // Has no enough quantity in the warehouse
    if (product.qty < dto.qty) {
      return {};
    }

    const paymentObservable = this.transport.send(CHARGE_PAYMENT, {
      email: 'string@mail.ru',
      amount: dto.qty * product.price,
    });

    await lastValueFrom(paymentObservable);

    const order = await this.orderModel.create({
      userId: dto.userId,
      productId: dto.productId,
      qty: dto.qty,
      overallPrice: dto.qty * product.price,
    });

    this.transport.emit(CREATE_NOTIFICATION, {
      userId: dto.userId,
      productName: product.title,
      orderId: order.id,
      qty: dto.qty,
    });

    this.transport.emit(ORDER_CREATED, {
      productId: dto.productId,
      qty: dto.qty,
    });

    return order;
  }

  async get(dto: GetOrderByQuery) {
    const order = await Order.findOne({
      where: {
        productId: dto.productId,
        userId: dto.userId,
      },
    });

    return { exists: !!order };
  }
}
