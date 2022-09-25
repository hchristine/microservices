import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications/notifications.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationsModule,
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
