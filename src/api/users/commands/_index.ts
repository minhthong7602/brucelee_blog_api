import { RegisterUserCommand, RegisterUserHandler, ResgiterUserResponse  } from './register.command';
import { ChangePasswordHandler, ChangePasswordCommand } from './change-password.command';
import { LoginHandler, LoginCommand } from './login.command';


export const CommandHandlers = [
  RegisterUserHandler,
  ChangePasswordHandler,
  LoginHandler
];

export {
  ResgiterUserResponse,
  RegisterUserCommand,
  ChangePasswordCommand,
  LoginCommand
};