import { PasswordEncrypter } from '@Utils/PasswordEncrypter';

import UserRepository from '../Repository/typeorm/UserRepository';
import ReactivateUserService from '../Services/ReactivateUserService';

export default function ReactivateUserServiceFactory(): ReactivateUserService {
  const userRepository = new UserRepository();
  const passwordEncrypter = new PasswordEncrypter();
  const reactivateUserService = new ReactivateUserService(
    userRepository,
    passwordEncrypter,
  );
  return reactivateUserService;
}
