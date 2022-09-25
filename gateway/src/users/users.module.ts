import { Module } from '@nestjs/common';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { USERS_SVC } from './constants';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const options: ClientProviderOptions['options'] = {
  servers: process.env.TRANSPORT_ENDPOINT,
};

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SVC,
        transport: Transport.NATS,
        options,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
