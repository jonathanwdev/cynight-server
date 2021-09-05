import { PasswordEncrypter } from '@Utils/PasswordEncrypter';

import UserRepository from '../Repository/typeorm/UserRepository';
import UpdateUserService from '../Services/UpdateUserService';

export default function UpdateUserServiceFactory(): UpdateUserService {
  const userRepository = new UserRepository();
  const passwordEncrypter = new PasswordEncrypter();
  const updateUserService = new UpdateUserService(
    passwordEncrypter,
    userRepository,
  );
  return updateUserService;
}
