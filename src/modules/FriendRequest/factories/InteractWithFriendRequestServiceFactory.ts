import FriendRepository from '@Modules/FriendShip/Repository/typeorm/FriendRepository';
import UserRepository from '@Modules/User/Repository/typeorm/UserRepository';

import FriendRequestRepository from '../Repository/typeorm/FriendRequestRepository';
import InteractWithFriendRequestService from '../Services/InteractWithFriendRequestService';

export default function InteractWithFriendRequestFactory(): InteractWithFriendRequestService {
  const friendRequestRepository = new FriendRequestRepository();
  const friendRepository = new FriendRepository();
  const userRepository = new UserRepository();
  const interactWithFriendRequestService = new InteractWithFriendRequestService(
    friendRequestRepository,
    friendRepository,
    userRepository,
  );
  return interactWithFriendRequestService;
}
