import { Controller, Get, Res, Request, HttpStatus, UseGuards, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { ROLE_CONIFG } from '../../core/auth/auth.config';
import { ListTagQuery } from './queries/_index';
import { AddOrUpdateTagCommand } from './commands/_index';

@UseGuards(JwtAuthGuard)
@Controller('api/tags')
export class TagsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }
  
  @Roles(ROLE_CONIFG.anonymous)
  @Get()
  public async getAllTags(
    @Res() response
  ) {
    const queryResponse = await this.queryBus.execute(new ListTagQuery());

    response.status(HttpStatus.OK).json(queryResponse);
  }

  @Roles(ROLE_CONIFG.admin)
  @Post()
  public async addTag(
    @Res() response,
    @Body() body: AddOrUpdateTagCommand
  ) {
    const commandResponse = await this.commandBus.execute(new AddOrUpdateTagCommand(
      body.name,
      body.description,
      body.id,
      body.is_active
    ));

    response.status(HttpStatus.OK).json(commandResponse);
  }
}
