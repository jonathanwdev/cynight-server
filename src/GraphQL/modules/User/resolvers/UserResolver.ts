import CreateUserServiceFactory from '@Modules/User/factories/CreateUserServiceFactory';
import UserRepository from '@Modules/User/Repository/typeorm/UserRepository';
import User from '@Typeorm/entity/User';
import { Resolver, Mutation, Query, Arg } from 'type-graphql';

import { CreateUserInput, FindOneUserInput } from '../Inputs/User';

@Resolver()
export class UserResolver {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  @Mutation(() => User)
  public async CreateUser(
    @Arg('data', () => CreateUserInput) data: CreateUserInput,
  ): Promise<User | null> {
    const user = CreateUserServiceFactory().run(data);
    return user;
  }

  @Query(() => [User], { nullable: true })
  public async FindAllActiveUsers(): Promise<User[] | []> {
    const users = await this.userRepository.findAllActiveUsers();
    return users;
  }

  @Query(() => User, { nullable: true })
  public async FindOneUser(
    @Arg('data', () => FindOneUserInput) data: FindOneUserInput,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOneUserByEmailOrID(data);
    return user;
  }

  @Mutation(() => User, { nullable: true })
  public async DeleteUser(
    @Arg('data', () => FindOneUserInput) data: FindOneUserInput,
  ): Promise<User | null> {
    const user = await this.userRepository.deleteUserByEmailOrID(data);
    return user;
  }
}
