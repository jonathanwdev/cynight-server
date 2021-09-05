import User from '@Typeorm/entity/User';

export type findUserParams = {
  id?: string;
  email?: string;
  nick?: string;
};

export type createUserData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  nick: string;
};

export type updateUserData = {
  id: string;
  name: string;
  email: string;
  nick: string;
  password?: string;
  passwordConfirmation?: string;
};

export interface IUserRepository {
  findAllActiveUsers: () => Promise<User[] | []>;
  findOneUserByEmailOrIDorNick: (
    params: findUserParams,
  ) => Promise<User | undefined>;
  createUser: (data: createUserData) => Promise<User>;
  deleteUserByID: (id: string) => Promise<User | undefined>;
  reactivateUserByID: (id: string) => Promise<User | undefined>;
  updateUser: (data: updateUserData) => Promise<User>;
}
