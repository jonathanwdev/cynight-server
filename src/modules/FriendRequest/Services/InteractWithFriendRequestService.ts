import {
  NotFoundError,
  ServerError,
  UnauthorizedError,
} from '@Helpers/AppoloError';
import { IFriendRepository } from '@Modules/FriendShip/Repository/usecases/IFriendRepository';
import { IUserRepository } from '@Modules/User/Repository/usecases/IUserRepository';

import { IFriendRequestRepository } from '../Repository/usecases/IFriendRequestRepository';

export type InteractWithFriendRequestParams = {
  friendRequestId: string;
  userId: string;
  status: 'accepted' | 'rejected';
};

class InteractWithFriendRequestService {
  constructor(
    private readonly friendRequestRepository: IFriendRequestRepository,
    private readonly friendRepository: IFriendRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  public async run({
    friendRequestId,
    userId,
    status,
  }: InteractWithFriendRequestParams): Promise<boolean> {
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

      const userRequesterExist =
        await this.userRepository.findOneUserByEmailOrIDorNick({
          id: friendRequest.user_requester,
        });

      if (!userRequesterExist || userRequesterExist.deleted_at) {
        await this.friendRequestRepository.deleteFriendRequestById(
          friendRequest.id,
        );
        throw new UnauthorizedError(
          'You can not accept requests from deleted users',
        );
      }

      if (status === 'rejected') {
        await this.friendRequestRepository.deleteFriendRequestById(
          friendRequest.id,
        );
        return true;
      }

      await Promise.all([
        await this.friendRepository.addFriend({
          friendId: friendRequest.user_requested,
          userId: friendRequest.user_requester,
        }),
        await this.friendRequestRepository.deleteFriendRequestById(
          friendRequest.id,
        ),
      ]);

      return true;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default InteractWithFriendRequestService;
