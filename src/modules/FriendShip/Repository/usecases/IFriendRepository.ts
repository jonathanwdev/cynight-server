import Friends from '@Typeorm/entity/Friends';

export type addFriendData = {
  friendId: string;
  userId: string;
};

export interface IFriendRepository {
  addFriend: (data: addFriendData) => Promise<boolean>;
  findOneFriend: (data: addFriendData) => Promise<Friends | undefined>;
  findAllFriends: (userId: string) => Promise<Friends[] | undefined>;
}
