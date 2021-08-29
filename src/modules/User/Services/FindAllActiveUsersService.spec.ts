import {
  IPasswordEncrypter,
  passwordComparerData,
  passwordEncrypterData,
} from '@Utils/usecases/IPasswordEncrypter';

import { UserRepositoryFake } from '../Repository/fakes/UserRepositoryFake';
import { createUserData } from '../Repository/usecases/IUserRepository';
import CreateUserService from './CreateUserService';
import FindAllActiveUsersService from './FindAllActiveUsersService';

const makeSut = (): FindAllActiveUsersService => {
  const fakeRepository = new UserRepositoryFake();
  return new FindAllActiveUsersService(fakeRepository);
};

const makeFakeEncrypter = (): IPasswordEncrypter => {
  class FakeEncrypter implements IPasswordEncrypter {
    async comparePassword(_: passwordComparerData): Promise<boolean> {
      return true;
    }
    async encrypt(data: passwordEncrypterData): Promise<string> {
      return data.password;
    }
  }
  return new FakeEncrypter();
};

type sutTypes = {
  fakeRepository: UserRepositoryFake;
  fakeUserCreator: CreateUserService;
};
const makeFakeUser = (): sutTypes => {
  const fakeRepository = new UserRepositoryFake();
  const fakeEncrypter = makeFakeEncrypter();
  const fakeUserCreator = new CreateUserService(fakeEncrypter, fakeRepository);
  return {
    fakeRepository,
    fakeUserCreator,
  };
};

const makeFakeUserInput = (): createUserData => ({
  name: 'any_name',
  email: 'any_mail@mail.com',
  nick: 'any_nick@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password',
});

describe('FindAllActiveUserService', () => {
  it('should return all active users', async () => {
    const sut = makeSut();
    const { fakeUserCreator } = makeFakeUser();
    await fakeUserCreator.run(makeFakeUserInput());
    const users = await sut.run();
    console.log(users);
    expect(users).toHaveLength(1);
  });
});
