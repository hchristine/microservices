import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  GET_PRODUCTS,
  CREATE_PRODUCT,
  CreateProductDto,
  GET_PRODUCT_BY_ID,
} from 'microservices-hk-common';
import { OnOrderCreatedDto, ProductsService } from './products.service';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @MessagePattern(GET_PRODUCTS)
  getProducts() {
    return this.productsService.getAll();
  }

  @MessagePattern(CREATE_PRODUCT)
  createProduct(data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @MessagePattern(GET_PRODUCT_BY_ID)
  getById(dto: { productId: number }) {
    return this.productsService.getById(dto.productId);
  }

  @MessagePattern({ cmd: 'ORDER_CREATED' })
  onOrderCreated(dto: OnOrderCreatedDto) {
    return this.productsService.reduceQty(dto);
  }
}
