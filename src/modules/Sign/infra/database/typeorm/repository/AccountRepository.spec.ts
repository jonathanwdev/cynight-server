import connectionHelper from '@/shared/infra/database/helpers/PgHelper';
import { AccountRepository } from './AccountRepository';

const makeSut = (): AccountRepository => {
  return new AccountRepository();
};

const makeFakeUser = () => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  nick: 'any_nick',
  isInfluencer: true,
  password: 'any_password',
  created_at: new Date(),
});

const makeFakeRequest = () => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  nick: 'any_nick',
  isInfluencer: true,
  password: 'any_password',
});

describe('Account Repository', () => {
  beforeAll(async () => {
    await connectionHelper.create();
  });

  afterAll(async () => {
    await connectionHelper.close();
  });

  test('should return an account on success', async () => {
    const sut = makeSut();
    jest
      .spyOn(sut, 'create')
      .mockReturnValueOnce(new Promise(resolve => resolve(makeFakeUser())));
    const user = await sut.create(makeFakeRequest());
    expect(user).toBeTruthy();
    expect(user.id).toBe('any_id');
    expect(user.name).toBe('any_name');
    expect(user.nick).toBe('any_nick');
  });
});
