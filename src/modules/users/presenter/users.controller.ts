import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Authorization } from 'src/modules/auth/decorators/authorization.decorator';
import { Authorized } from 'src/modules/auth/decorators/authorized.decorator';
import { UsersService } from '../domain/users.service';
import { UserResource } from './resources/user.resource';
import { CreateUserBody } from 'src/modules/users/presenter/bodies/create-user.body';
import { GetUserIdParam } from './params/get-user-id.param';
import { UpdateUserBody } from './bodies/update-user.body';

@Controller('/v1/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userResource: UserResource,
  ) {}

  @Authorization('USER')
  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const user = await this.usersService.createUser({
      username: body.username,
      email: body.email,
      firstName: body.first_name,
      lastName: body.last_name,
      phoneNumbers: body.phone_numbers,
      password: body.password,
    });

    return {
      data: this.userResource.convert(user),
    };
  }

  @Authorization('USER')
  @Get('me')
  async getMe(@Authorized('id') userId: string) {
    const user = await this.usersService.getUserById(userId);

    return {
      data: this.userResource.convert(user),
    };
  }

  @Authorization('USER')
  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();

    return {
      data: users.map((user) => this.userResource.convert(user)),
    };
  }

  @Authorization('USER')
  @Get(':user_id')
  async getUserById(@Param() param: GetUserIdParam) {
    const user = await this.usersService.getUserById(param.user_id);

    return {
      data: this.userResource.convert(user),
    };
  }

  @Authorization('USER')
  @Patch(':user_id')
  async updateUserById(
    @Param() param: GetUserIdParam,
    @Body() body: UpdateUserBody,
  ) {
    const user = await this.usersService.updateUserById(param.user_id, {
      username: body.username,
      email: body.email,
      firstName: body.first_name,
      lastName: body.last_name,
      phoneNumbers: body.phone_numbers,
      password: body.password,
    });

    return {
      data: this.userResource.convert(user),
    };
  }

  @Authorization('USER')
  @Delete(':user_id')
  async deleteUserById(@Param() param: GetUserIdParam) {
    await this.usersService.deleteUserById(param.user_id);
  }
}
