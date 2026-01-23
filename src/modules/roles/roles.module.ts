import { Module } from '@nestjs/common';
import { RoleRosource } from './presenter/resources/role.resoucre';
import { RolesController } from './presenter/roles.controller';
import { RolesService } from './domain/roles.service';
import { RolesRepository } from './data/roles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleDao } from 'src/common/dao/role.dao';

@Module({
  imports: [TypeOrmModule.forFeature([RoleDao])],
  providers: [RoleRosource, RolesService, RolesRepository],
  controllers: [RolesController],
  exports: [RoleRosource],
})
export class RolesModule {}
