import User from '@Typeorm/entity/User';
import { IPasswordEncrypter } from '@Utils/usecases/IPasswordEncrypter';

import {
  createUserData,
  IUserRepository,
} from '../Repository/usecases/IUserRepository';

class CreateUserService {
  constructor(
    private readonly passwordEncrypter: IPasswordEncrypter,
    private readonly userRepository: IUserRepository,
  ) {}

  public async run({
    password,
    passwordConfirmation,
    ...data
  }: createUserData): Promise<User> {
    try {
      if (password !== passwordConfirmation) {
        throw new Error('Password does not match');
      }
      const encryptedPass = await this.passwordEncrypter.encrypt({
        password,
        salt: 8,
      });
      const user = await this.userRepository.createUser({
        ...data,
        password: encryptedPass,
        passwordConfirmation,
      });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default CreateUserService;
