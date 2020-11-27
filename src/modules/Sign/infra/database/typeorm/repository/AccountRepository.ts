import { getRepository, Repository } from 'typeorm';
import {
  ICreateAccountModel,
  ICreateAccountRepository,
  IUser,
} from '@/modules/Sign/data/usecases/CreateAccount/importHandler';
import { User } from '../entities/User';

export class AccountRepository implements ICreateAccountRepository {
  public async create(accountData: ICreateAccountModel): Promise<IUser> {
    const ormRepository: Repository<User> = getRepository(User);
    const user = ormRepository.create(accountData);
    await ormRepository.save(user);
    return user;
  }
}
