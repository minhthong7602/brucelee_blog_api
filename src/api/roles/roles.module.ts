import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRepostiory } from '../../data/repositories/roles.repository';
import { EventLogAccessRepository } from '../../data/repositories/event-log-access.repository';
import { QueryHandlers } from './queries/_index';
import { LoggerMiddleware } from '../../core/middlewares/logger.middleware';
import { SecurityService } from '../../core/securities/security.service';
@Module({
  imports: [TypeOrmModule.forFeature([RoleRepostiory, EventLogAccessRepository]), CqrsModule],
  controllers: [RolesController],
  providers: [
  ...QueryHandlers,
  SecurityService
  ]
})
export class RoleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  consumer
  .apply(LoggerMiddleware)
  .forRoutes(RolesController)
  }
}