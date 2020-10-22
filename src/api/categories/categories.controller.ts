import { Controller, Get, Res, Request, HttpStatus, UseGuards, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListCategoryQuery } from './queries/_index';
import { AddOrUpdateCategoryCommand } from './commands/_index';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { ROLE_CONIFG } from '../../core/auth/auth.config';

@UseGuards(JwtAuthGuard)
@Controller('api/categories')
export class CategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {

  }

  @Roles(ROLE_CONIFG.anonymous)
  @Get()
  public async getAllCategories(
    @Res() response
  ) {
    const queryResponse = await this.queryBus.execute(new ListCategoryQuery());

    response.status(HttpStatus.OK).json(queryResponse);
  }

  @Roles(ROLE_CONIFG.admin)
  @Post()
  public async addOrUpdateCategory(
    @Body() body: AddOrUpdateCategoryCommand,
    @Res() response
  ) {
    const commandResponse = await this.commandBus.execute(new AddOrUpdateCategoryCommand(
      body.name,
      body.description,
      body.is_active,
      body.id
    ));

    response.status(HttpStatus.OK).json(commandResponse);
  }
}
