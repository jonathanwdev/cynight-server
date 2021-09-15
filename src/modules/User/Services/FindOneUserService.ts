import { ServerError, NotFoundError } from '@Helpers/AppoloError';
import User from '@Typeorm/entity/User';

import { IUserRepository } from '../Repository/usecases/IUserRepository';

class FindOneUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async run(id: string): Promise<User | null> {
    try {
      if (!id) {
        throw new ServerError('ID must be provided');
      }
      const user = await this.userRepository.findOneUserByEmailOrIDorNick({
        id,
      });

      if (!user) {
        throw new NotFoundError('User does not exist');
      }

      return user;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default FindOneUserService;
