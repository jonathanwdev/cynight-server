import { ServerError } from '@Helpers/AppoloError';
import User from '@Typeorm/entity/User';

import {
  IUserRepository,
  findUserParams,
} from '../Repository/usecases/IUserRepository';

class DeleteUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async run({ email, id }: findUserParams): Promise<User | null> {
    try {
      if (!email && !id) {
        throw new ServerError('ID or Email must be provided');
      }
      const user = await this.userRepository.deleteUserByEmailOrID({
        email,
        id,
      });

      if (!user) {
        throw new ServerError('User does not exist');
      }

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default DeleteUserService;
