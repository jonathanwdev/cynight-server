import { IHasher } from '../../protocols/cryptography/IHasher';
import { DBcreateAccount } from './DBcreateAccount';

type SutTypes = {
  hasherStub: IHasher;
  sut: DBcreateAccount;
};

const makeHasherStub = (): IHasher => {
  class HasherStub implements IHasher {
    public async hash(value): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }
  return new HasherStub();
};

const makeSut = (): SutTypes => {
  const hasherStub = makeHasherStub();
  const sut = new DBcreateAccount(hasherStub);
  return {
    hasherStub,
    sut,
  };
};

describe('DBcreateAccount', () => {
  it('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      nick: 'valid_nick',
      isInfluencer: false,
      password: 'valid_password',
    };
    await sut.create(accountData);
    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  it('should throw  if hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      nick: 'valid_nick',
      isInfluencer: false,
      password: 'valid_password',
    };
    const promise = sut.create(accountData);
    expect(promise).rejects.toThrow();
  });
});
