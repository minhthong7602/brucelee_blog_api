import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './../../core/auth/auth.module';
import { UsersController } from './users.controller';
import { SecurityService } from '../../core/securities/security.service';
import { UsersRepository } from '../../data/repositories/users.repository';
import { CommandHandlers } from './commands/_index';
import { LoggerMiddleware } from './../../core/middlewares/logger.middleware';
import { EventLogAccessRepository } from './../../data/repositories/event-log-access.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository, EventLogAccessRepository]), CqrsModule, AuthModule],
  controllers: [UsersController],
  providers: [
    ...CommandHandlers,
    SecurityService
  ]
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .forRoutes(UsersController)
    }
}
