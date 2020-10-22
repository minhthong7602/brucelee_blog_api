import { Controller, Get, Post, Request, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand, ChangePasswordCommand, LoginCommand } from './commands/_index';
import { JwtAuthGuard } from './../../core/auth/jwt-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { ROLE_CONIFG } from './../../core/auth/auth.config';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Roles(ROLE_CONIFG.anonymous)
  @Post('register')
  public async registerUser(
    @Body() body: RegisterUserCommand,
    @Request() req,
    @Res() response
  ) {
    const commandResponse = await this.commandBus.execute(new RegisterUserCommand(
      body.username,
      body.password,
      req.ip
    ));

    response.status(HttpStatus.OK).json(commandResponse);
  }

  @Roles(ROLE_CONIFG.logged)
  @Post('change-password')
  public async changePassword(
    @Body() body: ChangePasswordCommand,
    @Res() response
  ) {
    const commandResponse = await this.commandBus.execute(new ChangePasswordCommand(
      body.username,
      body.old_password,
      body.new_password
    ));

    response.status(HttpStatus.OK).json(commandResponse);
  }

  @Roles(ROLE_CONIFG.anonymous)
  @Post('login')
  public async loginUser(
    @Body() body: LoginCommand,
    @Res() response
  ) {
    const commandResponse = await this.commandBus.execute(new LoginCommand(
      body.username,
      body.password
    ));

    response.status(HttpStatus.OK).json(commandResponse);
  }

  @Roles(ROLE_CONIFG.anonymous)
  @Get('/test-validate')
  searchData(@Request() req): string {
    return "test-validate";
  }
}
