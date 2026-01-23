import { Body, Controller, Post } from '@nestjs/common';
import { RolesService } from '../domain/roles.service';
import { Authorization } from 'src/modules/auth/decorators/authorization.decorator';
import { RoleRosource } from './resources/role.resoucre';
import { CreateRoleBody } from './bodies/create-role.body';

@Controller('/v1/roles')
export class RolesController {
  constructor(
    private readonly roleResource: RoleRosource,
    private readonly rolesSerivce: RolesService,
  ) {}

  @Authorization('USER')
  @Post()
  async createRole(@Body() body: CreateRoleBody) {
    const role = await this.rolesSerivce.createRole(body);

    return {
      data: this.roleResource.convert(role),
    };
  }
}
