import {
  IUser,
  ICreateAccount,
  ICreateAccountModel,
  IHasher,
} from './importHandler';

export class DBcreateAccount implements ICreateAccount {
  constructor(private readonly hasher: IHasher) {}

  public async create(account: ICreateAccountModel): Promise<IUser> {
    await this.hasher.hash(account.password);
    return new Promise(resolve => resolve(null));
  }
}
