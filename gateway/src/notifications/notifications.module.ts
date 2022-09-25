import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATIONS_SVC } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATIONS_SVC,
        transport: Transport.NATS,
        options: { servers: process.env.TRANSPORT_ENDPOINT },
      },
    ]),
  ],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
