import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

import { AuthPayload } from '../../types/auth';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) { }

  sign(data: AuthPayload): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(data, this.configService.getOrThrow('SECRET'), (err, token) => {
        err ? reject(err) : resolve(token!);
      });
    });
  }

  verify(token: string): Promise<AuthPayload> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.configService.getOrThrow('SECRET'),
        (err, data) => {
          console.log(err, data);
          err ? reject(err) : resolve(data as AuthPayload);
        },
      );
    });
  }
}
