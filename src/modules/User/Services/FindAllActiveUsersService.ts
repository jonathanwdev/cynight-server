import { ServerError } from '@Helpers/AppoloError';
import User from '@Typeorm/entity/User';

import { IUserRepository } from '../Repository/usecases/IUserRepository';

class CreateUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async run(): Promise<User[] | []> {
    try {
      const users = await this.userRepository.findAllActiveUsers();
      return users;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default CreateUserService;
