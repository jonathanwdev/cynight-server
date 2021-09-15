import FriendRepository from '../Repository/typeorm/FriendRepository';
import FindAllFriendsService from '../Services/FindAllFriendsService';

export default function FindAllFriendsServiceFactory(): FindAllFriendsService {
  const friendsRepository = new FriendRepository();
  const findFriendRequestsService = new FindAllFriendsService(
    friendsRepository,
  );
  return findFriendRequestsService;
}
