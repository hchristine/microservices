import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from 'microservices-hk-common';
import { AuthRequired } from '../decorators/auth-required.decorator';
import { ProductsService } from './products.service';

@ApiTags('Products')
@ApiBearerAuth()
@AuthRequired()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Get()
  getAll() {
    return this.productsService.getAll();
  }
}
