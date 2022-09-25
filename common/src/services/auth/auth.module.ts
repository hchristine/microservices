import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      global: true,
      providers: [AuthService],
      exports: [AuthService],
    };
  }
}
