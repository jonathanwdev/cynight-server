import { MissingParamError, ServerError } from '@Helpers/AppoloError';
import User from '@Typeorm/entity/User';

import { IUserRepository } from '../Repository/usecases/IUserRepository';

class DeleteUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async run(id: string): Promise<User | undefined> {
    try {
      if (!id) {
        throw new MissingParamError('ID must be provided');
      }
      const user = await this.userRepository.deleteUserByID(id);
      return user;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default DeleteUserService;
