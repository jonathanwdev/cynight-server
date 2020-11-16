import { IUser } from '@/modules/Sign/domain/models/IUser';

export type ICreateAccountModel = {
  name: string;
  email: string;
  nick: string;
  isInfluencer: boolean;
  password: string;
};

export interface ICreateAccount {
  create: (account: ICreateAccountModel) => Promise<IUser>;
}
