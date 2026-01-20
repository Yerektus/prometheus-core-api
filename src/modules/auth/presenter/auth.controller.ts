import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import { CreateUserBody } from './bodies/create-user.body';
import { UserResource } from 'src/modules/users/resources/user.resource';
import { AuthResource } from './resources/auth.resource';
import { LoginUserBody } from './bodies/login-user.body';

@Controller('/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userResource: UserResource,
    private readonly authResource: AuthResource,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserBody) {
    const [user, auth] = await this.authService.register({
      username: body.username,
      email: body.email,
      firstName: body.first_name,
      lastName: body.last_name,
      phoneNumbers: body.phone_numbers,
      password: body.password,
    });

    return {
      data: {
        user: this.userResource.convert(user),
        auth: this.authResource.convert(auth),
      },
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() body: LoginUserBody) {
    const [user, auth] = await this.authService.login({
      email: body.email,
      password: body.password,
    });

    return {
      data: {
        user: this.userResource.convert(user),
        auth: this.authResource.convert(auth),
      },
    };
  }
}
