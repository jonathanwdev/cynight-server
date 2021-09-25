import FriendRepository from '../Repository/typeorm/FriendRepository';
import FindAllBlockedFriendsService from '../Services/FindAllBlockedFriendsService';

export default function FindAllBlockedFriendsServiceFactory(): FindAllBlockedFriendsService {
  const friendsRepository = new FriendRepository();
  const findBlockedFriendsService = new FindAllBlockedFriendsService(
    friendsRepository,
  );
  return findBlockedFriendsService;
}
