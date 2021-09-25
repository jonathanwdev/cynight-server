import FriendRepository from '../Repository/typeorm/FriendRepository';
import DeleteFriendService from '../Services/DeleteFriendService';

export default function DeleteFriendServiceFactory(): DeleteFriendService {
  const friendsRepository = new FriendRepository();
  const deleteService = new DeleteFriendService(friendsRepository);
  return deleteService;
}
