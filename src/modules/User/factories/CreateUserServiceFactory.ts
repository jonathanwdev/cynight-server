import { PasswordEncrypter } from '@Utils/PasswordEncrypter';

import UserRepository from '../Repository/typeorm/UserRepository';
import CreateUserService from '../Services/CreateUserService';

export default function CreateUserServiceFactory(): CreateUserService {
  const userRepository = new UserRepository();
  const passwordEncrypter = new PasswordEncrypter();
  const createUserService = new CreateUserService(
    passwordEncrypter,
    userRepository,
  );
  return createUserService;
}
