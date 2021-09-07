import { isAuthenticated, MyContext } from '@GraphQL/middleware/Auth';
import UpdateUserAvatarServiceFactory from '@Modules/UserPictures/factories/UpdateUserAvatarServiceFactory';
import UpdateUserOnthenightServiceFactory from '@Modules/UserPictures/factories/UpdateUserOnthenightServiceFactory';
import { FileUpload } from '@Modules/UserPictures/Repository/usecases/IUserPicturesRepository';
import User from '@Typeorm/entity/User';
import { GraphQLUpload } from 'apollo-server-express';
import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from 'type-graphql';

@Resolver()
export class UserPicturesResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => User)
  public async AddUserAvatar(
    @Arg('picture', () => GraphQLUpload!)
    file: FileUpload,
    @Ctx() ctx: MyContext,
  ): Promise<User> {
    const { userId } = ctx.req!;
    const updateUserAvatarServiceFactory = UpdateUserAvatarServiceFactory();
    const userWithAvatar = await updateUserAvatarServiceFactory.run({
      files: file,
      userId,
    });
    return userWithAvatar;
  }

  @UseMiddleware(isAuthenticated)
  @Mutation(() => User)
  public async AddUserOnTheNight(
    @Arg('picture', () => GraphQLUpload!)
    file: FileUpload,
    @Ctx() ctx: MyContext,
  ): Promise<User> {
    const { userId } = ctx.req!;
    const updateUseroOnthenightServiceFactory =
      UpdateUserOnthenightServiceFactory();
    const userWithoOnthenight = await updateUseroOnthenightServiceFactory.run({
      files: file,
      userId,
    });
    return userWithoOnthenight;
  }
}
