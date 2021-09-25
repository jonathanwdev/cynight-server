import Friends from '@Typeorm/entity/Friends';

export type addFriendData = {
  friendId: string;
  userId: string;
};

export interface IFriendRepository {
  save: (friend: Friends) => Promise<void>;
  addFriend: (data: addFriendData) => Promise<boolean>;
  findOneFriend: (data: addFriendData) => Promise<Friends | undefined>;
  findAllFriends: (userId: string) => Promise<Friends[] | undefined>;
  findAllBlockedFriends: (userId: string) => Promise<Friends[] | undefined>;
  deleteFriendShip: (friendShip: Friends[]) => Promise<void>;
  findFriendShip: (data: addFriendData) => Promise<Friends[] | undefined>;
}
// encontrar amigos, paginar e contar
// partir para a próxima
