import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { QueryHandlers } from './queries/_index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from '../../data/repositories/categories.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { EventLogAccessRepository } from '../../data/repositories/event-log-access.repository';
import { LoggerMiddleware } from '../../core/middlewares/logger.middleware';
import { CommandHandlers } from './commands/_index';
@Module({
  imports: [TypeOrmModule.forFeature([CategoriesRepository, EventLogAccessRepository]), CqrsModule],
  controllers: [CategoriesController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers
  ]
})
export class CategoriesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(LoggerMiddleware)
     .forRoutes(CategoriesController)
  }
}
