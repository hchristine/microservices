import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrdersModule } from './orders/orders.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.TRANSPORT_ENDPOINT,
      },
    },
  );
  await app.listen();
}

bootstrap();
