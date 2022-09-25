import { Module } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { FeedbacksController } from './feedbacks.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FEEDBACKS_SVC } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: FEEDBACKS_SVC,
        transport: Transport.NATS,
        options: {
          servers: process.env.TRANSPORT_ENDPOINT,
        },
      },
    ]),
  ],
  providers: [FeedbacksService],
  controllers: [FeedbacksController],
})
export class FeedbacksModule {}
