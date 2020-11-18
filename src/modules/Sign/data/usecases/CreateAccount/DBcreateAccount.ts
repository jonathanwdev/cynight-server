import {
  IUser,
  IHasher,
  ICreateAccount,
  ICreateAccountModel,
  ICreateAccountRepository,
} from './importHandler';

export class DBcreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly createAccountRepository: ICreateAccountRepository,
  ) {}

  public async create(accountData: ICreateAccountModel): Promise<IUser> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const user = await this.createAccountRepository.create({
      ...accountData,
      password: hashedPassword,
    });
    return user;
  }
}
