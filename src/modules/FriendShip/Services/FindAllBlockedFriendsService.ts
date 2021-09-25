import { ServerError } from '@Helpers/AppoloError';
import { IFriendRepository } from '@Modules/FriendShip/Repository/usecases/IFriendRepository';
import Friends from '@Typeorm/entity/Friends';

class FindAllBlockedFriendsService {
  constructor(private readonly friendRepository: IFriendRepository) {}

  public async run(userId: string): Promise<Friends[] | undefined> {
    try {
      const friends = await this.friendRepository.findAllBlockedFriends(userId);
      return friends;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default FindAllBlockedFriendsService;
