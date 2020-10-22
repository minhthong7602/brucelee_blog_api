import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm'
import { Users } from '../../../data/entities/user.entity';
import { UsersRepository } from '../../../data/repositories/users.repository';
import { SecurityService } from '../../../core/securities/security.service';
import { ResponseModel, RESPONSE_STATUS } from '../../../core/configs/response-status.config';
import { ROLE_CONIFG } from '../../../core/auth/auth.config';
export class RegisterUserCommand {
  username: string;
  password: string;
  last_ip: string;
  constructor(username: string, password: string, last_ip: string) {
    this.username = username;
    this.password = password;
    this.last_ip = last_ip;
  }
}

export class ResgiterUserResponse extends ResponseModel {

}

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly securityService: SecurityService
  ) {}

  public async execute(command: RegisterUserCommand) : Promise<ResgiterUserResponse> {
    let response = new ResgiterUserResponse();
    const userTemp = await this.usersRepository.getByUserName(command.username);
    if(userTemp) {
      response.status = RESPONSE_STATUS.ERROR;
      response.message = 'Exists user';
      return response;
    }
    const user = new Users();
    const password = await this.securityService.encryptPassword(command.password);
    user.password = password.hash;
    user.password_salt = password.salt;
    user.username = command.username;
    user.last_ip = command.last_ip;
    user.role_id = ROLE_CONIFG.admin;
    response.data = await this.usersRepository.insertData(user);
    response.status = RESPONSE_STATUS.SUCCESSED;
    response.message = 'Created user successfuly';
    return response;
  }
}