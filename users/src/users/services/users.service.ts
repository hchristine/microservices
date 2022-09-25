import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { compare, genSalt, hash } from 'bcryptjs';
import {
  CreateUserDto,
  LoginUserDto,
  USER_CREATED,
} from 'microservices-hk-common';
import { AuthService } from 'microservices-hk-common';
import { TRANSPORT } from '../constants';

import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private authService: AuthService,

    @Inject(TRANSPORT)
    private readonly transport: ClientProxy,
  ) {}

  async register(dto: CreateUserDto) {
    const salt = await genSalt(10);
    const hashed = await hash(dto.password, salt);
    const user = await this.userModel.create({ ...dto, password: hashed });
    const token = await this.authService.sign({ id: user.id });

    this.transport.emit(USER_CREATED, {
      email: user.email,
    });

    return { token };
  }

  async login(dto: LoginUserDto) {
    const user = await this.userModel.findOne({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const isValid = await compare(dto.password, user.password);
    if (!isValid) {
      throw new NotFoundException();
    }

    const token = await this.authService.sign({ id: user.id });
    return { token };
  }
}
