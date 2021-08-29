import User from '@Typeorm/entity/User';
import { getRepository, Repository } from 'typeorm';

import {
  createUserData,
  findUserParams,
  IUserRepository,
} from '../usecases/IUserRepository';

class UserRepository implements IUserRepository {
  private readonly ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async createUser(data: createUserData): Promise<User> {
    const user = await this.ormRepository.create(data).save();
    return user;
  }

  public async findAllActiveUsers(): Promise<User[] | []> {
    const users = await this.ormRepository.find({
      where: { deleted_at: null },
    });
    return users;
  }

  public async findOneUserByEmailOrID(
    params: findUserParams,
  ): Promise<User | undefined> {
    const { email, id } = params;
    const user = await this.ormRepository.findOne({
      where: [{ email }, { id }],
    });
    return user;
  }

  public async deleteUserByEmailOrID(
    params: findUserParams,
  ): Promise<User | null> {
    const user = await this.findOneUserByEmailOrID(params);
    if (!user) {
      return null;
    }
    const updatedUser = await this.ormRepository.save({
      ...user,
      deleted_at: new Date(),
    });

    return updatedUser;
  }
}

export default UserRepository;
