import {
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '@Helpers/AppoloError';
import { IFriendRepository } from '@Modules/FriendShip/Repository/usecases/IFriendRepository';
import { IUserRepository } from '@Modules/User/Repository/usecases/IUserRepository';

import { IFriendRequestRepository } from '../Repository/usecases/IFriendRequestRepository';

export type AcceptFriendRequestParams = {
  friendRequestId: string;
  userId: string;
};

class AcceptFriendRequestService {
  constructor(
    private readonly friendRequestRepository: IFriendRequestRepository,
    private readonly friendRepository: IFriendRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async run({
    friendRequestId,
    userId,
  }: AcceptFriendRequestParams): Promise<boolean> {
    try {
      const friendRequest =
        await this.friendRequestRepository.findOneAwaitingFriendRequestByID(
          friendRequestId,
        );
      if (!friendRequest) {
        throw new NotFoundError('Friend request does not exist');
      }

      if (friendRequest.user_requested !== userId) {
        throw new UnauthorizedError('You can not accept this friend request');
      }

      if (friendRequest.status !== 'awaiting') {
        throw new UnauthorizedError('You can only accept awaiting requests');
      }

      const userExist = await this.userRepository.findOneUserByEmailOrIDorNick({
        id: friendRequest.user_requested,
      });

      if (!userExist || userExist.deleted_at) {
        friendRequest.status = 'rejected';
        await this.friendRequestRepository.save(friendRequest);
        throw new UnauthorizedError(
          'You can not accept requests from deleted users',
        );
      }

      friendRequest.status = 'accepted';
      await this.friendRequestRepository.save(friendRequest);
      await this.friendRepository.addFriend({
        friendId: friendRequest.user_requested,
        userId: friendRequest.user_requester,
      });

      return true;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default AcceptFriendRequestService;
