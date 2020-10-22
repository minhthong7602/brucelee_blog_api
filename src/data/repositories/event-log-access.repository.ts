import { EntityRepository } from 'typeorm';
import { EventLogAccess } from '../entities/event-log-access.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(EventLogAccess)
export class EventLogAccessRepository extends BaseRepository<EventLogAccess> {

}