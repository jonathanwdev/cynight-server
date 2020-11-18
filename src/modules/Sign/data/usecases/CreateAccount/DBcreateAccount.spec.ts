import { DBcreateAccount } from './DBcreateAccount';

describe('DBcreateAccount', () => {
  it('should call Hasher with correct password', async () => {
    class HasherStub {
      public async hash(value): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'));
      }
    }
    const hasherStub = new HasherStub();
    const sut = new DBcreateAccount(hasherStub);
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
});
