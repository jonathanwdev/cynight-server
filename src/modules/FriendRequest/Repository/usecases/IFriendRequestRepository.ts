import FriendRequest from '@Typeorm/schemas/FriendRequest';

export type sendFriendRequestData = {
  userRequester: string;
  userRequested: string;
  text: string;
};

export type findFriendRequestParams = {
  userId: string;
  page: number;
};

export type findOneFriendRequestParams = {
  requesterId: string;
  requestedId: string;
};

export type reactFriendRequestParams = 'accepted' | 'rejected';

export interface IFriendRequestRepository {
  create: (data: sendFriendRequestData) => Promise<FriendRequest>;
  save: (friendRequest: FriendRequest) => Promise<null>;
  findAllAwaitingFriendRequests: (
    data: findFriendRequestParams,
  ) => Promise<[FriendRequest[], number]>;
  findOneAwaitingFriendRequest: (
    data: findOneFriendRequestParams,
  ) => Promise<FriendRequest | undefined>;
  findOneAwaitingFriendRequestByID: (
    requestId: string,
  ) => Promise<FriendRequest | undefined>;
}
