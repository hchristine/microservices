import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  REGISTER_USER,
  LOGIN_USER,
  CreateUserDto,
  LoginUserDto,
} from 'microservices-hk-common';
import { UsersService } from './services/users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(REGISTER_USER)
  register(dto: CreateUserDto) {
    return this.usersService.register(dto);
  }

  @MessagePattern(LOGIN_USER)
  login(dto: LoginUserDto) {
    return this.usersService.login(dto);
  }
}
