import {
  ServerError,
  MissingParamError,
  UnauthorizedError,
} from '@Helpers/AppoloError';
import { IFriendRepository } from '@Modules/FriendShip/Repository/usecases/IFriendRepository';
import { IUserRepository } from '@Modules/User/Repository/usecases/IUserRepository';
import FriendRequest from '@Typeorm/schemas/FriendRequest';

import {
  IFriendRequestRepository,
  sendFriendRequestData,
} from '../Repository/usecases/IFriendRequestRepository';

class SendFriendRequestService {
  constructor(
    private readonly friendRequestRepository: IFriendRequestRepository,
    private readonly userRepository: IUserRepository,
    private readonly friendRepository: IFriendRepository,
  ) {}

  public async run({
    userRequested,
    userRequester,
  }: Omit<sendFriendRequestData, 'text'>): Promise<FriendRequest> {
    try {
      const friendExist = await this.friendRepository.findOneFriend({
        friendId: userRequested,
        userId: userRequester,
      });

      if (friendExist) {
        throw new UnauthorizedError('Friend already exist');
      }

      if (!userRequested || !userRequester) {
        throw new MissingParamError('Missing params !');
      }

      if (userRequester === userRequested) {
        throw new UnauthorizedError(
          'You can not create an invite for yourself',
        );
      }

      const userRequesterExist =
        await this.userRepository.findOneUserByEmailOrIDorNick({
          id: userRequester,
        });

      const userRequestedExist =
        await this.userRepository.findOneUserByEmailOrIDorNick({
          id: userRequested,
        });

      if (!userRequesterExist || !userRequestedExist) {
        throw new UnauthorizedError('Invalid User !');
      }

      const friendRequestExist =
        await this.friendRequestRepository.findOneAwaitingFriendRequest({
          requestedId: userRequested,
          requesterId: userRequester,
        });

      if (friendRequestExist) {
        throw new UnauthorizedError('Friend request already exist');
      }

      const text = `The user @${userRequesterExist.nick} wants to be your friend.\n What about you ?`;

      const friendRequest = await this.friendRequestRepository.create({
        text,
        userRequested,
        userRequester,
      });

      return friendRequest;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default SendFriendRequestService;
