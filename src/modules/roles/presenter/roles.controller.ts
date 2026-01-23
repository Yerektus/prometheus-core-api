import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from '../domain/roles.service';
import { Authorization } from 'src/modules/auth/decorators/authorization.decorator';
import { RoleRosource } from './resources/role.resoucre';
import { CreateRoleBody } from './bodies/create-role.body';
import { GetRoleIdParam } from './params/get-role-id.param';
import { UpdateRoleBody } from './bodies/update-role.body';

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

  @Authorization('USER')
  @Get()
  async getRoles() {
    const roles = await this.rolesSerivce.getRoles();

    return {
      data: roles.map((role) => this.roleResource.convert(role)),
    };
  }

  @Authorization('USER')
  @Get(':role_id')
  async getRoleById(@Param() param: GetRoleIdParam) {
    const role = await this.rolesSerivce.getRoleById(param.role_id);

    return {
      data: this.roleResource.convert(role),
    };
  }

  @Authorization('USER')
  @Patch(':role_id')
  async updateRoleById(
    @Param() param: GetRoleIdParam,
    @Body() body: UpdateRoleBody,
  ) {
    const role = await this.rolesSerivce.updateRoleById(param.role_id, body);

    return {
      data: this.roleResource.convert(role),
    };
  }

  @Authorization('USER')
  @Delete(':role_id')
  async deleteRoleById(@Param() param: GetRoleIdParam) {
    await this.rolesSerivce.removeRoleById(param.role_id);
  }
}
