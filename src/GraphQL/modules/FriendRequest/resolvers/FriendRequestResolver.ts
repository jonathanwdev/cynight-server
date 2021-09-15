import { isAuthenticated, MyContext } from '@GraphQL/middleware/Auth';
import { isValidUser } from '@GraphQL/middleware/User';
import AcceptFriendRequestFactory from '@Modules/FriendRequest/factories/AcceptFriendRequestServiceFactory';
import FindFriendRequestsServiceFactory from '@Modules/FriendRequest/factories/FindFriendRequestsServiceFactory';
import SendFriendRequestServiceFactory from '@Modules/FriendRequest/factories/SendFriendRequestServiceFactory';
import { FindFriendRequestsResponseType } from '@Modules/FriendRequest/Services/FindFriendRequestsService';
import FriendRequest from '@Typeorm/schemas/FriendRequest';
import {
  Resolver,
  Mutation,
  Query,
  Arg,
  UseMiddleware,
  Ctx,
} from 'type-graphql';

import {
  SendFriendRequestInput,
  FindFriendRequestInput,
  FindFriendRequestResponse,
} from '../Inputs/FriendRequest';

@Resolver()
export class FriendRequestResolver {
  @UseMiddleware(isAuthenticated)
  @Mutation(() => FriendRequest)
  public async SendFriendRequest(
    @Arg('data', () => SendFriendRequestInput)
    { requestedId }: SendFriendRequestInput,
    @Ctx() ctx: MyContext,
  ): Promise<FriendRequest | null> {
    const { userId } = ctx.req!;
    const sendFriendRequest = SendFriendRequestServiceFactory();
    const friendRequest = await sendFriendRequest.run({
      userRequested: requestedId,
      userRequester: userId,
    });
    return friendRequest;
  }

  @UseMiddleware(isAuthenticated, isValidUser)
  @Query(() => FindFriendRequestResponse)
  public async FindAllFriendRequests(
    @Arg('data', () => FindFriendRequestInput) data: FindFriendRequestInput,
    @Ctx() ctx: MyContext,
  ): Promise<FindFriendRequestsResponseType> {
    const { userId } = ctx.req!;
    const requests = await FindFriendRequestsServiceFactory().run({
      page: data.page,
      userId,
    });
    return requests;
  }

  @UseMiddleware(isAuthenticated, isValidUser)
  @Mutation(() => Boolean)
  public async AcceptFriendRequest(
    @Arg('requestId', () => String) requestId: string,
    @Ctx() ctx: MyContext,
  ): Promise<boolean> {
    const { userId } = ctx.req!;
    const requests = await AcceptFriendRequestFactory().run({
      friendRequestId: requestId,
      userId,
    });
    return requests;
  }
}
