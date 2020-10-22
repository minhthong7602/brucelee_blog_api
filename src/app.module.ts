import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './core/configs/orm.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './core/exceptions-filter/http-exception.filter';
import { HttpExceptionAccessRepository } from './data/repositories/http-exception-access.repository';
import { AllExceptionsFilter } from './core/exceptions-filter/all-exceptions.filter';
import { UsersModule } from './api/users/users.module';
import { RoleModule } from './api/roles/roles.module';
import { TagsModule } from './api/tags/tags.module';
import { CategoriesModule } from './api/categories/categories.module';
import { BlogsModule } from './api/blogs/blogs.module';
import { UploadFileModule } from './api/upload-file/upload-file.module';
import { CommonService } from './core/ultils/common.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([HttpExceptionAccessRepository]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'files')
    }),
    UsersModule,
    RoleModule,
    TagsModule,
    CategoriesModule,
    BlogsModule,
    UploadFileModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    CommonService
  ],
})
export class AppModule {
  
}
