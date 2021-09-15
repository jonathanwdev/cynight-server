import FriendRepository from '@Modules/FriendShip/Repository/typeorm/FriendRepository';
import UserRepository from '@Modules/User/Repository/typeorm/UserRepository';

import FriendRequestRepository from '../Repository/typeorm/FriendRequestRepository';
import AcceptFriendRequest from '../Services/AcceptFriendRequest';

export default function AcceptFriendRequestFactory(): AcceptFriendRequest {
  const friendRequestRepository = new FriendRequestRepository();
  const friendRepository = new FriendRepository();
  const userRepository = new UserRepository();
  const acceptFriendRequestService = new AcceptFriendRequest(
    friendRequestRepository,
    friendRepository,
    userRepository,
  );
  return acceptFriendRequestService;
}
