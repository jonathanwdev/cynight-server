import { ICreateAccountModel } from '@/modules/Sign/domain/usecases/ICreateAccount';
import { IUser } from '@/modules/Sign/domain/models/IUser';

export interface ICreateAccountRepository {
  create: (accoun: ICreateAccountModel) => Promise<IUser>;
}
