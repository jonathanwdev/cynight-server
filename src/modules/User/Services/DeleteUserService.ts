import { ServerError } from '@Helpers/AppoloError';
import User from '@Typeorm/entity/User';

import { IUserRepository } from '../Repository/usecases/IUserRepository';

class DeleteUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async run(id: string): Promise<User | undefined> {
    try {
      if (!id) {
        throw new ServerError('ID must be provided');
      }
      const userExist = await this.userRepository.findOneUserByEmailOrIDorNick({
        id,
      });

      if (!userExist) {
        throw new ServerError('User does not exist');
      }

      const user = await this.userRepository.deleteUserByID(id);

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default DeleteUserService;
