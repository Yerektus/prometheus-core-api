import { HttpStatus, Injectable } from '@nestjs/common';
import { RolesRepository } from '../data/roles.repository';
import { CreateRoleDto } from '../dto/create-role.dto';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { RoleEntity } from 'src/common/entities/role.entity';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async createRole(payload: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.rolesRepository.getRoleByName(payload.name);

    if (role) {
      throw buildHttpError(ErrorCode.RoleAlreadyExist, HttpStatus.BAD_REQUEST);
    }

    return this.rolesRepository.insertAndGetRole(payload);
  }

  getRoles(): Promise<RoleEntity[]> {
    return this.rolesRepository.getRoles();
  }

  async getRoleById(roleId: string): Promise<RoleEntity> {
    const role = await this.rolesRepository.getRoleById(roleId);

    if (!role) {
      throw buildHttpError(ErrorCode.RoleNotFound, HttpStatus.NOT_FOUND);
    }

    return role;
  }

  async updateRoleById(
    role_id: string,
    payload: UpdateRoleDto,
  ): Promise<RoleEntity> {
    const role = await this.rolesRepository.getRoleById(role_id);

    if (!role) {
      throw buildHttpError(ErrorCode.RoleNotFound, HttpStatus.NOT_FOUND);
    }

    const updatedRole = await this.rolesRepository.updateRoleById(
      role_id,
      payload,
    );

    if (!updatedRole) {
      throw buildHttpError(
        ErrorCode.InternalServerError,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return updatedRole;
  }

  async removeRoleById(roleId: string): Promise<void> {
    const role = await this.rolesRepository.getRoleById(roleId);

    if (!role) {
      throw buildHttpError(ErrorCode.RoleNotFound, HttpStatus.NOT_FOUND);
    }

    await this.rolesRepository.removeRoleById(roleId);
  }
}
