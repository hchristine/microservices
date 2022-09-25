import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateProductDto,
  CREATE_PRODUCT,
  GET_PRODUCTS,
} from 'microservices-hk-common';
import { PRODUCTS_SVC } from './constants';

@Injectable()
export class ProductsService {
  constructor(@Inject(PRODUCTS_SVC) private productsService: ClientProxy) {}

  create(dto: CreateProductDto) {
    return this.productsService.send(CREATE_PRODUCT, dto);
  }

  getAll() {
    return this.productsService.send(GET_PRODUCTS, {});
  }
}
