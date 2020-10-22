import { EntityRepository } from 'typeorm';
import { HttpExceptionAccess } from '../entities/http-exception-access.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(HttpExceptionAccess)
export class HttpExceptionAccessRepository extends BaseRepository<HttpExceptionAccess> {

}