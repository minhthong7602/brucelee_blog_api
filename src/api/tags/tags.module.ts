import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsRepository } from '../../data/repositories/tags.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerMiddleware } from '../../core/middlewares/logger.middleware';
import { QueryHandlers } from './queries/_index';
import { CommandHandlers } from './commands/_index';
import { EventLogAccessRepository } from '../../data/repositories/event-log-access.repository';
@Module({
  imports: [TypeOrmModule.forFeature([TagsRepository, EventLogAccessRepository]), CqrsModule],
  controllers: [TagsController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers
  ]
})
export class TagsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(LoggerMiddleware)
     .forRoutes(TagsController)
  }
}
