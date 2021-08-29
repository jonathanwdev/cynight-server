import User from '@Typeorm/entity/User';

export type findUserParams = {
  id?: string;
  email?: string;
};

export type createUserData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  nick: string;
};

export interface IUserRepository {
  findAllActiveUsers: () => Promise<User[] | []>;
  findOneUserByEmailOrID: (params: findUserParams) => Promise<User | undefined>;
  createUser: (data: createUserData) => Promise<User>;
  deleteUserByEmailOrID: (params: findUserParams) => Promise<User | null>;
}
