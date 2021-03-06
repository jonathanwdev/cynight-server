import connection from '@/shared/infra/database/helpers/DatabaseConn';
import { AccountRepository } from './AccountRepository';

const makeSut = (): AccountRepository => {
  return new AccountRepository();
};

const makeFakeRequest = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  nick: 'any_nick',
  isInfluencer: true,
  password: 'any_password',
});
const makeFakeAccount = () => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  nick: 'any_nick',
  isInfluencer: true,
  password: 'any_password',
  created_at: new Date(),
  updated_at: new Date(),
});

describe('Account Repository', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });

  test('should return an account on success', async () => {
    const sut = makeSut();
    const user = await sut.create(makeFakeRequest());
    jest
      .spyOn(sut, 'create')
      .mockRejectedValueOnce(
        new Promise(resolve => resolve(makeFakeAccount())),
      );
    expect(user).toHaveProperty('id');
    expect(user.name).toBe('any_name');
    expect(user.nick).toBe('any_nick');
  });
});
