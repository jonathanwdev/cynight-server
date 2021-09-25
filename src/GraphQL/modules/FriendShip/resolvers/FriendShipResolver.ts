import { isAuthenticated, MyContext } from '@GraphQL/middleware/Auth';
import { isValidUser } from '@GraphQL/middleware/User';
import DeleteFriendShipServiceFactory from '@Modules/FriendShip/factories/DeleteFriendShipServiceFactory';
import FindAllBlockedFriendsServiceFactory from '@Modules/FriendShip/factories/FindAllBlockedFriendsServiceFactory';
import FindAllFriendsServiceFactory from '@Modules/FriendShip/factories/FindAllFriendsServiceFactory';
import Friends from '@Typeorm/entity/Friends';
import {
  Resolver,
  Query,
  UseMiddleware,
  Arg,
  Ctx,
  Mutation,
} from 'type-graphql';

@Resolver()
export class FriendShipResolver {
  @UseMiddleware(isAuthenticated, isValidUser)
  @Query(() => [Friends], { nullable: true })
  public async FindAllFriendShips(
    @Ctx() ctx: MyContext,
  ): Promise<Friends[] | undefined> {
    const { userId } = ctx.req!;
    const friends = await FindAllFriendsServiceFactory().run(userId);
    return friends;
  }

  @UseMiddleware(isAuthenticated, isValidUser)
  @Query(() => [Friends], { nullable: true })
  public async FindAllBlockedFriendShips(
    @Ctx() ctx: MyContext,
  ): Promise<Friends[] | undefined> {
    const { userId } = ctx.req!;
    const friends = await FindAllBlockedFriendsServiceFactory().run(userId);
    return friends;
  }

  @UseMiddleware(isAuthenticated, isValidUser)
  @Mutation(() => Boolean, { nullable: true })
  public async DeleteFriendShip(
    @Arg('friendId', () => String) friendId: string,
    @Ctx() ctx: MyContext,
  ): Promise<boolean> {
    const { userId } = ctx.req!;
    const friends = await DeleteFriendShipServiceFactory().run({
      friendId,
      userId,
    });
    return friends;
  }
}
