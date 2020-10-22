import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { EventLogAccess } from '../../data/entities/event-log-access.entity';
import { EventLogAccessRepository } from '../../data/repositories/event-log-access.repository';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
 constructor(
     @InjectRepository(EventLogAccessRepository)
     private readonly eventLogAccessRepository: EventLogAccessRepository
 ) {}
 use(req: Request, res: Response, next: Function) {
   const eventLog = new EventLogAccess();
   eventLog.api_method = req.method;
   eventLog.api_url = req.url;
   eventLog.ip = req.ip;
   this.eventLogAccessRepository.insertData(eventLog);
   next();
  }
}