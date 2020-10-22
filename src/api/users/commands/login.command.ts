import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResponseModel, RESPONSE_STATUS } from '../../../core/configs/response-status.config';
import { AuthService } from '../../../core/auth/auth.service';

export class LoginCommand {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private authService: AuthService) {

  }

  public async execute(command: LoginCommand) : Promise<ResponseModel> {
    const response = new ResponseModel();
    const user = await this.authService.validateUser(command.username, command.password);
    if(!user) {
      response.status = RESPONSE_STATUS.ERROR;
      response.message = 'Login faild';
      return response;
    }
    response.data = {
      user,
      token: await this.authService.login(user)
    }
    response.status = RESPONSE_STATUS.SUCCESSED;
    response.message = 'Login successfully';
    return response;
  }
}