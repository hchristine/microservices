import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthRequiredGuard } from '../guards/auth-required.guard';

export const AuthRequired = () => applyDecorators(UseGuards(AuthRequiredGuard));
