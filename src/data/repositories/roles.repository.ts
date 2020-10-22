import { EntityRepository } from 'typeorm';
import { Role } from '../entities/roles.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(Role)
export class RoleRepostiory extends BaseRepository<Role> {
}