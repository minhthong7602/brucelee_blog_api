import { Controller, Get, Res, Request, HttpStatus, UseGuards, Post, Body, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListBlogInHomeQuery } from './queries/_index';
import { AddOrUpdateBlogCommand } from './commands/_index';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { ROLE_CONIFG } from '../../core/auth/auth.config';

@UseGuards(JwtAuthGuard)
@Controller('api/blogs')
export class BlogsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Roles(ROLE_CONIFG.anonymous)
  @Get()
  public async getBlogsInHome(
    @Query() params: ListBlogInHomeQuery,
    @Res() response
  ) {
    const queryResponse = await this.queryBus.execute(new ListBlogInHomeQuery(
      params.page,
      params.page_size
    ));

    response.status(HttpStatus.OK).json(queryResponse);
  }

  @Roles(ROLE_CONIFG.admin)
  @Post('create')
  public async addOrUpdateBlog(
    @Body() body: AddOrUpdateBlogCommand,
    @Res() response
  ) {
    const commandResponse = await this.commandBus.execute(new AddOrUpdateBlogCommand(
      body.id,
      body.title,
      body.sub_title,
      body.content,
      body.tags,
      body.categories,
      body.status
    ));

    response.status(HttpStatus.OK).json(commandResponse);
  }
}
