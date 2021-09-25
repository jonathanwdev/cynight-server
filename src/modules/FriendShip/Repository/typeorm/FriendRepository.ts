import Friends from '@Typeorm/entity/Friends';
import { getRepository, Repository } from 'typeorm';

import {
  IFriendRepository,
  addFriendData,
} from '../usecases/IFriendRepository';

class FriendRepository implements IFriendRepository {
  private readonly ormRepository: Repository<Friends>;
  constructor() {
    this.ormRepository = getRepository(Friends);
  }

  public async save(friend: Friends): Promise<void> {
    await this.ormRepository.save(friend);
  }

  public async addFriend({
    friendId,
    userId,
  }: addFriendData): Promise<boolean> {
    const friendRequest1 = this.ormRepository.create({
      friend_id: friendId,
      user_id: userId,
    });

    const friendRequest2 = this.ormRepository.create({
      friend_id: userId,
      user_id: friendId,
    });

    await Promise.all([
      await this.ormRepository.save(friendRequest1),
      await this.ormRepository.save(friendRequest2),
    ]);

    return true;
  }

  public async findOneFriend({
    friendId,
    userId,
  }: addFriendData): Promise<Friends | undefined> {
    const friend = await this.ormRepository.findOne({
      where: { user_id: userId, friend_id: friendId },
      relations: ['friend'],
    });
    return friend;
  }

  public async findAllFriends(userId: string): Promise<Friends[] | undefined> {
    const friends = await this.ormRepository.find({
      where: { user_id: userId, isBlocked: false },
      relations: ['friend'],
    });
    return friends;
  }

  public async findFriendShip({
    userId,
    friendId,
  }: addFriendData): Promise<Friends[] | undefined> {
    const friends = await this.ormRepository.find({
      where: [
        { user_id: userId, friend_id: friendId },
        { user_id: friendId, friend_id: userId },
      ],
    });
    return friends;
  }

  public async findAllBlockedFriends(
    userId: string,
  ): Promise<Friends[] | undefined> {
    const friends = await this.ormRepository.find({
      where: { user_id: userId, isBlocked: true },
      relations: ['friend'],
    });
    return friends;
  }

  public async deleteFriendShip(friendShip: Friends[]): Promise<void> {
    await this.ormRepository.remove(friendShip);
  }
}

export default FriendRepository;
