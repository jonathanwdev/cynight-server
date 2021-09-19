import FriendRequest from '@Typeorm/schemas/FriendRequest';
import { request } from 'express';
import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import {
  IFriendRequestRepository,
  sendFriendRequestData,
  findFriendRequestParams,
  findOneFriendRequestParams,
} from '../usecases/IFriendRequestRepository';

class FriendRequestRepository implements IFriendRequestRepository {
  private readonly ormRepository: MongoRepository<FriendRequest>;
  constructor() {
    this.ormRepository = getMongoRepository(FriendRequest, 'mongo');
  }

  public async create({
    userRequested,
    userRequester,
    text,
  }: sendFriendRequestData): Promise<FriendRequest> {
    const friendRequest = await this.ormRepository.create({
      user_requested: userRequested,
      user_requester: userRequester,
      text,
    });
    await this.ormRepository.save(friendRequest);
    return friendRequest;
  }

  public async save(friendRequest: FriendRequest): Promise<void> {
    await this.ormRepository.save(friendRequest);
  }

  public async deleteFriendRequestById(id: ObjectID): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findAllAwaitingFriendRequests({
    userId,
    page = 0,
  }: findFriendRequestParams): Promise<[FriendRequest[], number]> {
    const requests = await this.ormRepository.findAndCount({
      where: { user_requester: userId, status: 'awaiting' },
      order: { created_at: 'DESC' },
      take: 10,
      skip: page,
    });
    return requests;
  }

  public async findOneAwaitingFriendRequestByID(
    requestId: string,
  ): Promise<FriendRequest | undefined> {
    const requests = await this.ormRepository.findOne(requestId);
    return requests;
  }

  public async findOneAwaitingFriendRequest({
    requestedId,
    requesterId,
  }: findOneFriendRequestParams): Promise<FriendRequest | undefined> {
    const friendRequest = await this.ormRepository.findOne({
      where: {
        $or: [
          { user_requested: requestedId, user_requester: requesterId },
          { user_requested: requesterId, user_requester: requestedId },
        ],
      },
    });
    return friendRequest;
  }
}

export default FriendRequestRepository;
