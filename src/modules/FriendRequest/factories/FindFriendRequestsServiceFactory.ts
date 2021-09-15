import FriendRequestRepository from '../Repository/typeorm/FriendRequestRepository';
import FindFriendRequestsService from '../Services/FindFriendRequestsService';

export default function FindFriendRequestServiceFactory(): FindFriendRequestsService {
  const friendRequestRepository = new FriendRequestRepository();
  const findFriendRequestsService = new FindFriendRequestsService(
    friendRequestRepository,
  );
  return findFriendRequestsService;
}
