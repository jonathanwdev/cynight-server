import FriendRepository from '@Modules/FriendShip/Repository/typeorm/FriendRepository';
import UserRepository from '@Modules/User/Repository/typeorm/UserRepository';

import FriendRequestRepository from '../Repository/typeorm/FriendRequestRepository';
import SendFriendRequestService from '../Services/SendFriendRequestService';

export default function SendFriendRequestServiceFactory(): SendFriendRequestService {
  const friendRequestRepository = new FriendRequestRepository();
  const userRepository = new UserRepository();
  const friendRepository = new FriendRepository();
  const sendRequestService = new SendFriendRequestService(
    friendRequestRepository,
    userRepository,
    friendRepository,
  );
  return sendRequestService;
}
