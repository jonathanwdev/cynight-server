import User from '@Typeorm/entity/User';
import { v4 as uuid } from 'uuid';

import {
  createUserData,
  findUserParams,
  IUserRepository,
} from '../usecases/IUserRepository';

export class UserRepositoryFake implements IUserRepository {
  private users: User[] = [];

  public async createUser(data: createUserData): Promise<User> {
    const user = new User();
    user.id = uuid();
    user.name = data.name;
    user.email = data.email;
    user.nick = data.nick;
    user.password = data.password;
    user.created_at = new Date();
    user.updated_at = new Date();

    this.users.push(user);

    return user;
  }
  public async findAllActiveUsers(): Promise<User[] | []> {
    const { users } = this;
    users.filter(u => u.deleted_at !== null);
    return users;
  }

  public async findOneUserByEmailOrID(
    params: findUserParams,
  ): Promise<User | undefined> {
    if (!params.email || !params.id) {
      return undefined;
    }
    const user = this.users.find(
      u => u.id === params.id || u.email === params.email,
    );
    return user;
  }

  public async deleteUserByEmailOrID(
    params: findUserParams,
  ): Promise<User | null | undefined> {
    const user = this.users.find(
      u => u.id === params.id || u.email === params.email,
    );
    if (!user) {
      return null;
    }
    user.deleted_at = new Date();
    return user;
  }
}
