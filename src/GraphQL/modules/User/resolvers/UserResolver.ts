import { isAuthenticated, MyContext } from '@GraphQL/middleware/Auth';
import { isValidUser } from '@GraphQL/middleware/User';
import { AuthenticationInput } from '@GraphQL/modules/Auth/Inputs/Auth';
import CreateUserServiceFactory from '@Modules/User/factories/CreateUserServiceFactory';
import DeleteUserServiceFactory from '@Modules/User/factories/DeleteUserServiceFactory';
import FindAllActiveUsersServiceFactory from '@Modules/User/factories/FindAllActiveUsersServiceFactory';
import FindOneUserServiceFactory from '@Modules/User/factories/FindOneUserServiceFactory';
import ReactivateUserServiceFactorty from '@Modules/User/factories/ReactivateUserServiceFactorty';
import UpdateUserServiceFactory from '@Modules/User/factories/UpdateUserServiceFactory';
import User from '@Typeorm/entity/User';
import {
  Resolver,
  Mutation,
  Query,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import { CreateUserInput, UpdateAuthUserInput } from '../Inputs/User';

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  public async CreateUser(
    @Arg('data', () => CreateUserInput) data: CreateUserInput,
  ): Promise<User | null> {
    const createUserFactory = CreateUserServiceFactory();
    const user = await createUserFactory.run(data);
    return user;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => User)
  public async UpdateAuthenticatedUser(
    @Arg('data', () => UpdateAuthUserInput) data: UpdateAuthUserInput,
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const { userId } = ctx.req!;
    const updateService = UpdateUserServiceFactory();
    const user = await updateService.run({ ...data, id: userId });
    return user;
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => [User], { nullable: true })
  public async FindAllActiveUsers(): Promise<User[] | []> {
    const users = await FindAllActiveUsersServiceFactory().run();
    return users;
  }

  @UseMiddleware(isAuthenticated)
  @Query(() => User, { nullable: true })
  public async FindAuthenticatedUser(
    @Ctx() ctx: MyContext,
  ): Promise<User | null> {
    const { userId } = ctx.req!;
    const user = await FindOneUserServiceFactory().run(userId);
    return user;
  }

  @UseMiddleware(isAuthenticated, isValidUser)
  @Mutation(() => User, { nullable: true })
  public async DeleteAuthenticatedUser(
    @Ctx() ctx: MyContext,
  ): Promise<User | undefined> {
    const { userId } = ctx.req!;
    const user = await DeleteUserServiceFactory().run(userId);
    return user;
  }

  @Mutation(() => User, { nullable: true })
  public async ReactivateUser(
    @Arg('data', () => AuthenticationInput)
    data: AuthenticationInput,
  ): Promise<User | undefined> {
    const user = await ReactivateUserServiceFactorty().run(data);
    return user;
  }
}
