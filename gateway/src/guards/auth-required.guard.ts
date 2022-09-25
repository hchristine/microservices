import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'microservices-hk-common';

@Injectable()
export class AuthRequiredGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    return this.verifyToken(token, request);
  }

  async verifyToken(token: string, request: any) {
    if (!token) {
      return false;
    }

    const slicedToken = token.slice(7);

    try {
      const user = await this.authService.verify(slicedToken);
      request.user = user;
      return true;
    } catch {
      return false;
    }
  }
}
