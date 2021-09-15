import { isAuthenticated, MyContext } from '@GraphQL/middleware/Auth';
import { isValidUser } from '@GraphQL/middleware/User';
import FindAllFriendsServiceFactory from '@Modules/FriendShip/factories/FindAllFriendsServiceFactory';
import Friends from '@Typeorm/entity/Friends';
import { Resolver, Query, UseMiddleware, Ctx } from 'type-graphql';

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
}
