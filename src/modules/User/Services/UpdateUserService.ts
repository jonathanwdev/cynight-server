import { ServerError } from '@Helpers/AppoloError';
import User from '@Typeorm/entity/User';
import { IPasswordEncrypter } from '@Utils/usecases/IPasswordEncrypter';

import {
  updateUserData,
  IUserRepository,
} from '../Repository/usecases/IUserRepository';

class UpdateUserService {
  constructor(
    private readonly passwordEncrypter: IPasswordEncrypter,
    private readonly userRepository: IUserRepository,
  ) {}

  public async run({
    password,
    passwordConfirmation,
    id,
    email,
    name,
    nick,
  }: updateUserData): Promise<User> {
    try {
      const userExist = await this.userRepository.findOneUserByEmailOrIDorNick({
        id,
      });

      if (!userExist) {
        throw new Error('User does not exist !');
      }

      if (password !== passwordConfirmation) {
        throw new Error('Password does not match !');
      }

      if (password) {
        const changedPassword = await this.passwordEncrypter.comparePassword({
          encryptedPassword: userExist.password,
          password,
        });

        if (!changedPassword) {
          userExist.password = await this.passwordEncrypter.encrypt({
            password,
          });
        }
      }
      if (email !== userExist.email) {
        const emailExist =
          await this.userRepository.findOneUserByEmailOrIDorNick({
            email,
          });

        if (emailExist && emailExist.id !== id) {
          throw new ServerError('Email already in use');
        }
      }
      userExist.email = email;

      if (nick !== userExist.nick) {
        const nickExist =
          await this.userRepository.findOneUserByEmailOrIDorNick({
            nick,
          });

        if (nickExist && nickExist.id !== id) {
          throw new ServerError('Nick already in use');
        }
      }
      userExist.nick = nick;
      userExist.name = name;

      const updatedUser = await this.userRepository.updateUser(userExist);

      return updatedUser;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default UpdateUserService;
