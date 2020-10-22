import { Controller, Get, Post, Put, Res, Query, HttpStatus, Body, UnauthorizedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListRoleQuery } from './queries/_index';
import { SecurityService } from '../../core/securities/security.service';
@Controller('api/roles')
export class RolesController {
  constructor(
   private readonly commandBus: CommandBus,
   private readonly queryBus: QueryBus,
   private readonly securityService: SecurityService
  ) {}

  @Get()
  async getAll(
  @Res() response
  ) {
   const roles = await this.queryBus.execute(new ListRoleQuery ());
   response.status(HttpStatus.OK).json(roles);
  }
}