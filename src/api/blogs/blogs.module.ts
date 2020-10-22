import { Module, MiddlewareConsumer } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { LoggerMiddleware } from '../../core/middlewares/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { BlogsRepository } from './../../data/repositories/blogs.repository';
import { TagsRepository } from './../../data/repositories/tags.repository';
import { BlogTagMappingRepository } from './../../data/repositories/blog-tag-mapping.repository';
import { BlogCategoryMappingRepository } from './../../data/repositories/blog-category-mapping.repository';
import { EventLogAccessRepository } from './../../data/repositories/event-log-access.repository';
import { QueryHandlers } from './queries/_index';
import { CommonService } from '../../core/ultils/common.service';
import { CommandHandlers } from './commands/_index';
@Module({
  imports: [TypeOrmModule.forFeature([BlogsRepository, BlogTagMappingRepository, BlogCategoryMappingRepository, EventLogAccessRepository, TagsRepository]), CqrsModule],
  controllers: [BlogsController],
  providers: [
    ...QueryHandlers,
    ...CommandHandlers,
    CommonService
  ]
})
export class BlogsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
     .apply(LoggerMiddleware)
     .forRoutes(BlogsController)
  }
}
