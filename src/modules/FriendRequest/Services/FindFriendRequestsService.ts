import { ServerError } from '@Helpers/AppoloError';
import { ObjectID } from 'typeorm';

import {
  IFriendRequestRepository,
  findFriendRequestParams,
} from '../Repository/usecases/IFriendRequestRepository';

type FindFriendRequests = {
  id: ObjectID;
  user_requester: string;
  user_requested: string;
  text: string;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export type FindFriendRequestsResponseType = {
  items: FindFriendRequests[] | [];
  count: number;
};

class FindFriendRequestService {
  constructor(
    private readonly friendRequestRepository: IFriendRequestRepository,
  ) {}

  public async run({
    userId,
    page,
  }: findFriendRequestParams): Promise<FindFriendRequestsResponseType> {
    try {
      const queryResponse =
        await this.friendRequestRepository.findAllAwaitingFriendRequests({
          page,
          userId,
        });
      const items = queryResponse[0].map(item => ({
        id: item.id,
        user_requester: item.user_requester,
        user_requested: item.user_requested,
        text: item.text,
        status: item.status,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));

      const friendRequests = {
        items,
        count: queryResponse[1],
      };

      return friendRequests;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default FindFriendRequestService;
