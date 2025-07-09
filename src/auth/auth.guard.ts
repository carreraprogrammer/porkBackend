import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader: string = request.headers['authorization'] || '';
    const token = authHeader.replace('Bearer ', '');
    if (token === 'porkcolombia-token') {
      return true;
    }
    throw new UnauthorizedException('Acceso no autorizado');
  }
}
