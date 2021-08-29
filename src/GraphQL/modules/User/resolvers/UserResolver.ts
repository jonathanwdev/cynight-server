import CreateUserServiceFactory from '@Modules/User/factories/CreateUserServiceFactory';
import DeleteUserServiceFactory from '@Modules/User/factories/DeleteUserServiceFactory';
import FindAllActiveUsersServiceFactory from '@Modules/User/factories/FindAllActiveUsersServiceFactory';
import FindOneUserServiceFactory from '@Modules/User/factories/FindOneUserServiceFactory';
import User from '@Typeorm/entity/User';
import { Resolver, Mutation, Query, Arg } from 'type-graphql';

import { CreateUserInput, FindOneUserInput } from '../Inputs/User';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  public async CreateUser(
    @Arg('data', () => CreateUserInput) data: CreateUserInput,
  ): Promise<User | null> {
    const user = CreateUserServiceFactory().run(data);
    return user;
  }

  @Query(() => [User], { nullable: true })
  public async FindAllActiveUsers(): Promise<User[] | []> {
    const users = await FindAllActiveUsersServiceFactory().run();
    return users;
  }

  @Query(() => User, { nullable: true })
  public async FindOneUser(
    @Arg('data', () => FindOneUserInput) data: FindOneUserInput,
  ): Promise<User | null> {
    const user = await FindOneUserServiceFactory().run(data);
    return user;
  }

  @Mutation(() => User, { nullable: true })
  public async DeleteUser(
    @Arg('data', () => FindOneUserInput) data: FindOneUserInput,
  ): Promise<User | null> {
    const user = await DeleteUserServiceFactory().run(data);
    return user;
  }
}
