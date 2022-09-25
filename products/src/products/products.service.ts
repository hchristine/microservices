import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from 'microservices-hk-common';
import { Product } from './entities/product.entity';

export type OnOrderCreatedDto = {
  productId: number;
  qty: number;
};

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  create(dto: CreateProductDto) {
    return this.productModel.create({ ...dto });
  }

  getAll() {
    return this.productModel.findAll();
  }

  getById(id: number) {
    return this.productModel.findByPk(id);
  }

  async reduceQty(dto: OnOrderCreatedDto) {
    const product = await this.productModel.findOne({
      where: {
        id: dto.productId,
      },
    });

    product.qty -= dto.qty;
    await product.save();
  }
}
