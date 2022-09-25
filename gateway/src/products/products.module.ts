import { Module } from '@nestjs/common';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PRODUCTS_SVC } from './constants';

const options: ClientProviderOptions['options'] = {
  servers: process.env.TRANSPORT_ENDPOINT,
};

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SVC,
        transport: Transport.NATS,
        options,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
