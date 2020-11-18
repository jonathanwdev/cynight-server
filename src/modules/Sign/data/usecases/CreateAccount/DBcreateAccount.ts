import { IUser } from '@/modules/Sign/domain/models/IUser';
import {
  ICreateAccount,
  ICreateAccountModel,
} from '@/modules/Sign/domain/usecases/ICreateAccount';
import { IHasher } from '../../protocols/cryptography/IHasher';

export class DBcreateAccount implements ICreateAccount {
  constructor(private readonly hasher: IHasher) {}

  public async create(account: ICreateAccountModel): Promise<IUser> {
    await this.hasher.hash(account.password);
    return new Promise(resolve => resolve(null));
  }
}
