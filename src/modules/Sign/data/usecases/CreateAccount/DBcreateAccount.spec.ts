import Mockdate from 'mockdate';
import {
  IHasher,
  ICreateAccountModel,
  IUser,
  ICreateAccountRepository,
} from './importHandler';
import { DBcreateAccount } from './DBcreateAccount';

const makeAccountData = () => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  nick: 'valid_nick',
  isInfluencer: false,
  password: 'valid_password',
});

const makeCreatAccountRepository = (): ICreateAccountRepository => {
  class CreatAccountRepository implements ICreateAccountRepository {
    public async create(account: ICreateAccountModel): Promise<IUser> {
      return new Promise(resolve =>
        resolve({
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email@mail.com',
          nick: 'valid_nick',
          isInfluencer: false,
          password: 'hashed_password',
          created_at: new Date(),
        }),
      );
    }
  }
  return new CreatAccountRepository();
};

const makeHasherStub = (): IHasher => {
  class HasherStub implements IHasher {
    public async hash(value): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }
  return new HasherStub();
};

type SutTypes = {
  hasherStub: IHasher;
  sut: DBcreateAccount;
  createAcccountRepositoryStub: ICreateAccountRepository;
};

const makeSut = (): SutTypes => {
  const hasherStub = makeHasherStub();
  const createAcccountRepositoryStub = makeCreatAccountRepository();
  const sut = new DBcreateAccount(hasherStub, createAcccountRepositoryStub);
  return {
    hasherStub,
    sut,
    createAcccountRepositoryStub,
  };
};

describe('DBcreateAccount', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });

  it('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    await sut.create(makeAccountData());
    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  it('should throw  if hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.create(makeAccountData());
    expect(promise).rejects.toThrow();
  });

  it('should call CreateAccountRepository with correct values', async () => {
    const { sut, createAcccountRepositoryStub } = makeSut();
    const hashSpy = jest.spyOn(createAcccountRepositoryStub, 'create');
    await sut.create(makeAccountData());
    expect(hashSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      nick: 'valid_nick',
      isInfluencer: false,
      password: 'hashed_password',
    });
  });

  it('should throw  if CreateAccountRepository throws', async () => {
    const { sut, createAcccountRepositoryStub } = makeSut();
    jest
      .spyOn(createAcccountRepositoryStub, 'create')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const promise = sut.create(makeAccountData());
    expect(promise).rejects.toThrow();
  });

  it('should return a user on success', async () => {
    const { sut } = makeSut();
    const user = await sut.create(makeAccountData());
    expect(user).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      nick: 'valid_nick',
      isInfluencer: false,
      password: 'hashed_password',
      created_at: new Date(),
    });
  });
});
