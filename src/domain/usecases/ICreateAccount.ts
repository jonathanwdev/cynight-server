import { User } from '../typeorm/entities/User';

export type ICreateAccountModel = {
  name: string;
  email: string;
  nick: string;
  isInfluencer: boolean;
  password: string;
};

export interface ICreateAccount {
  create: (account: ICreateAccountModel) => Promise<User>;
}
