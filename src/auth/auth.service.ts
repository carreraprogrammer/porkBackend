import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateCredentials(username: string, password: string): boolean {
    return username === 'PorkColombia' && password === 'Pork@admin';
  }
}
