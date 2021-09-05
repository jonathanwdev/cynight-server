import User from '@Typeorm/entity/User';
import { getRepository, Repository } from 'typeorm';

import {
  createUserData,
  findUserParams,
  IUserRepository,
  updateUserData,
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

  public async updateUser(data: updateUserData): Promise<User> {
    await this.ormRepository.save(data);
    const user = await this.ormRepository.findOne(data.id);
    return user!;
  }

  public async findAllActiveUsers(): Promise<User[] | []> {
    const users = await this.ormRepository.find({
      where: { deleted_at: null },
    });
    return users;
  }

  public async findOneUserByEmailOrIDorNick(
    params: findUserParams,
  ): Promise<User | undefined> {
    const { email, id, nick } = params;
    const user = await this.ormRepository.findOne({
      where: [{ email }, { id }, { nick }],
    });
    return user;
  }

  public async deleteUserByID(id: string): Promise<User | undefined> {
    await this.ormRepository.update(id, {
      deleted_at: new Date(),
    });
    const user = await this.findOneUserByEmailOrIDorNick({ id });
    return user;
  }

  public async reactivateUserByID(id: string): Promise<User | undefined> {
    await this.ormRepository.update(id, {
      deleted_at: undefined,
    });
    const user = await this.findOneUserByEmailOrIDorNick({
      id,
    });

    return user;
  }
}

export default UserRepository;
