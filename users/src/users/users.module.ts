import { Module } from '@nestjs/common';
import { AuthModule } from 'microservices-hk-common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TRANSPORT } from './constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSPORT,
        transport: Transport.NATS,
        options: {
          servers: process.env.TRANSPORT_ENDPOINT,
        },
      },
    ]),
    SequelizeModule.forFeature([User]),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        uri: configService.getOrThrow('DB_URI'),
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule.forRoot(),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
