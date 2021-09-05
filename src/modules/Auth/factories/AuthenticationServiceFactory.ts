import { PasswordEncrypter } from '@Utils/PasswordEncrypter';

import { TokenGenerator } from '../helpers/TokenGenerator';
import AuthRepository from '../Repository/typeorm/AuthRepository';
import AuthenticationService from '../Services/AuthenticationService';

export default function AuthenticationServiceFactory(): AuthenticationService {
  const authRepository = new AuthRepository();
  const passwordEncrypter = new PasswordEncrypter();
  const tokenGenerator = new TokenGenerator();

  const authenticationService = new AuthenticationService(
    passwordEncrypter,
    authRepository,
    tokenGenerator,
  );
  return authenticationService;
}
