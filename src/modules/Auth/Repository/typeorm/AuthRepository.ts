import User from '@Typeorm/entity/User';
import { getRepository, Repository } from 'typeorm';

import { IAuthenticationRepository } from '../usecases/IAuthenticationRepository';

class AuthRepository implements IAuthenticationRepository {
  private readonly ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAuthorizedUser(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }
}

export default AuthRepository;
