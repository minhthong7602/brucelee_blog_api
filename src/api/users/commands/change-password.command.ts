import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../../data/repositories/users.repository';
import { SecurityService } from '../../../core/securities/security.service';
import { ResponseModel, RESPONSE_STATUS } from '../../../core/configs/response-status.config';

export class ChangePasswordCommand {
  username: string;
  old_password: string;
  new_password: string;
  constructor(username: string, old_password: string, new_password: string) {
    this.username = username;
    this.old_password = old_password;
    this.new_password = new_password;
  }
}

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly securityService: SecurityService
  ) {}

  public async execute(command: ChangePasswordCommand) : Promise<ResponseModel>  {
    const response = new ResponseModel();
    const userTemp = await this.usersRepository.getByUserName(command.username);
    if(!userTemp) {
      response.status = RESPONSE_STATUS.ERROR;
      response.message = 'Not exists user';
      return response;
    }
    // validate old password
    const isCheckPass = await this.securityService.checkPasswordWithSalt(command.old_password, userTemp.password, userTemp.password_salt);
    if(!isCheckPass) {
      response.status = RESPONSE_STATUS.ERROR;
      response.message = 'Password faild';
      return response;
    }

    const password = await this.securityService.encryptPassword(command.new_password);
    userTemp.password = password.hash;
    userTemp.password_salt = password.salt;
    
    response.data = await this.usersRepository.updateData(userTemp);
    response.status = RESPONSE_STATUS.SUCCESSED;
    response.message = 'Change password successfuly';
    return response;
  }
}