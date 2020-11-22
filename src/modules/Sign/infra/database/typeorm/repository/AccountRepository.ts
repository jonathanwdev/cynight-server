import { getRepository, Repository } from 'typeorm';
import {
  ICreateAccountModel,
  ICreateAccountRepository,
  IUser,
} from '@/modules/Sign/data/usecases/CreateAccount/importHandler';
import { User } from '../entities/User';

export class AccountRepository implements ICreateAccountRepository {
  private readonly ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(accountData: ICreateAccountModel): Promise<IUser> {
    const user = this.ormRepository.create(accountData);
    await this.ormRepository.save(user);
    return user;
  }
}
