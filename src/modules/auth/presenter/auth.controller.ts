import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register() {}
}
