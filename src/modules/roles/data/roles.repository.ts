import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDao } from 'src/common/dao/role.dao';
import { RoleEntity } from 'src/common/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(RoleDao)
    private readonly rolesRepository: Repository<RoleDao>,
  ) {}

  insertAndGetRole(payload: CreateRoleDto): Promise<RoleEntity> {
    return this.rolesRepository.save({
      id: uuidv4(),
      name: payload.name,
      description: payload.description,
    });
  }

  getRoleByName(name: string): Promise<RoleEntity | null> {
    return this.rolesRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  getRoles(): Promise<RoleEntity[]> {
    return this.rolesRepository.find();
  }

  getRoleById(roleId: string): Promise<RoleEntity | null> {
    return this.rolesRepository.findOne({
      where: {
        id: roleId,
      },
    });
  }

  async updateRoleById(
    role_id: string,
    payload: UpdateRoleDto,
  ): Promise<RoleEntity | null> {
    await this.rolesRepository.update(role_id, {
      name: payload.name,
      description: payload.description,
    });

    return this.rolesRepository.findOne({
      where: {
        id: role_id,
      },
    });
  }

  async removeRoleById(roleId: string): Promise<void> {
    await this.rolesRepository.softDelete(roleId);
  }
}
