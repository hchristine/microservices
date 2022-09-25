import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  REGISTER_USER,
  LOGIN_USER,
  CreateUserDto,
  LoginUserDto,
} from 'microservices-hk-common';
import { USERS_SVC } from './constants';

@Injectable()
export class UsersService {
  constructor(@Inject(USERS_SVC) private usersService: ClientProxy) {}

  register(dto: CreateUserDto) {
    return this.usersService.send(REGISTER_USER, dto);
  }

  login(dto: LoginUserDto) {
    return this.usersService.send(LOGIN_USER, dto);
  }
}
