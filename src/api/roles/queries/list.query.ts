import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepostiory } from '../../../data/repositories/roles.repository';


export class ListRoleQuery {

}

@QueryHandler(ListRoleQuery)
export class ListRoleHandler implements IQueryHandler<ListRoleQuery> {
  constructor(
  @InjectRepository(RoleRepostiory)
  private readonly rolesRepository: RoleRepostiory
  ) {}

  public async execute(query: ListRoleQuery) : Promise<any[]> {
  return this.rolesRepository.getAll();
  }
}