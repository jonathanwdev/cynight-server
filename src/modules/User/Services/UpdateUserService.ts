import {
  MissingParamError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '@Helpers/AppoloError';
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
    lastPassword,
  }: updateUserData): Promise<User> {
    try {
      const userExist = await this.userRepository.findOneUserByEmailOrIDorNick({
        id,
      });

      if (!userExist) {
        throw new NotFoundError('User does not exist !');
      }

      if (lastPassword) {
        const changedPassword = await this.passwordEncrypter.comparePassword({
          encryptedPassword: userExist.password,
          password: lastPassword,
        });

        if (!changedPassword) {
          throw new UnauthorizedError('Invalid password !');
        }

        if (password !== passwordConfirmation) {
          throw new UnauthorizedError('Password does not match !');
        }

        if (passwordConfirmation && password) {
          userExist.password = await this.passwordEncrypter.encrypt({
            password,
          });
        } else {
          throw new MissingParamError(
            'Password and passwordConfirmation is required !',
          );
        }
      }

      if (email !== userExist.email) {
        const emailExist =
          await this.userRepository.findOneUserByEmailOrIDorNick({
            email,
          });

        if (emailExist && emailExist.id !== id) {
          throw new UnauthorizedError('Email already in use');
        }
      }
      userExist.email = email;

      if (nick !== userExist.nick) {
        const nickExist =
          await this.userRepository.findOneUserByEmailOrIDorNick({
            nick,
          });

        if (nickExist && nickExist.id !== id) {
          throw new UnauthorizedError('Nick already in use');
        }
      }
      userExist.nick = nick;
      userExist.name = name;

      const updatedUser = await this.userRepository.save(userExist);

      return updatedUser;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default UpdateUserService;
