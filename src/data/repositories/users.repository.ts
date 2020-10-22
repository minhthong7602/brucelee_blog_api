import { EntityRepository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(Users)
export class UsersRepository extends BaseRepository<Users> {
  public async getByUserName(username: string) : Promise<Users> {
    return this.findOne({ where: {username: username}});
  }
}