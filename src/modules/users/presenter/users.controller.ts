import { Controller, Get } from '@nestjs/common';
import { Authorization } from 'src/modules/auth/decorators/authorization.decorator';
import { Authorized } from 'src/modules/auth/decorators/authorized.decorator';
import { UsersService } from '../domain/users.service';
import { UserResource } from './resources/user.resource';

@Controller('/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userResource: UserResource,
  ) {}

  @Authorization('USER')
  @Get('me')
  async getMe(@Authorized('id') userId: string) {
    const user = await this.usersService.getUserById(userId);

    return {
      data: this.userResource.convert(user),
    };
  }
}
