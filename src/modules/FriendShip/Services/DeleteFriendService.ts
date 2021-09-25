import { ServerError } from '@Helpers/AppoloError';
import {
  IFriendRepository,
  addFriendData,
} from '@Modules/FriendShip/Repository/usecases/IFriendRepository';

class DeleteFriendService {
  constructor(private readonly friendRepository: IFriendRepository) {}

  public async run({ userId, friendId }: addFriendData): Promise<boolean> {
    try {
      const friendShip = await this.friendRepository.findFriendShip({
        friendId,
        userId,
      });

      if (friendShip && friendShip?.length < 2) {
        throw new ServerError('Friendship does not exist');
      }

      await this.friendRepository.deleteFriendShip(friendShip!);
      return true;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default DeleteFriendService;
