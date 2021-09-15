import {
  MissingParamError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '@Helpers/AppoloError';
import { authenticaionData } from '@Modules/Auth/Services/AuthenticationService';
import User from '@Typeorm/entity/User';
import { IPasswordEncrypter } from '@Utils/usecases/IPasswordEncrypter';

import { IUserRepository } from '../Repository/usecases/IUserRepository';

class ReactivateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordEncrypter: IPasswordEncrypter,
  ) {}

  public async run({
    email,
    password,
  }: authenticaionData): Promise<User | undefined> {
    try {
      if (!email || !password) {
        throw new MissingParamError('Email and password must be provided');
      }
      const userExist = await this.userRepository.findOneUserByEmailOrIDorNick({
        email,
      });

      if (!userExist) {
        throw new NotFoundError('Invalid Email or Password');
      }

      const compare = await this.passwordEncrypter.comparePassword({
        encryptedPassword: userExist.password,
        password,
      });

      if (!compare) {
        throw new UnauthorizedError('Invalid Email or Password');
      }

      const user = await this.userRepository.reactivateUserByID(userExist.id);

      return user;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default ReactivateUserService;
