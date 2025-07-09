import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    if (this.authService.validateCredentials(username, password)) {
      return { success: true, token: 'porkcolombia-token' };
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }
}
