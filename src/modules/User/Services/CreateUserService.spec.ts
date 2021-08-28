import {
  IPasswordEncrypter,
  passwordComparerData,
  passwordEncrypterData,
} from '@Utils/usecases/IPasswordEncrypter';

import { UserRepositoryFake } from '../Repository/fakes/UserRepositoryFake';
import { createUserData } from '../Repository/usecases/IUserRepository';
import CreateUserService from './CreateUserService';

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

const makeSut = (): CreateUserService => {
  const fakeRepository = new UserRepositoryFake();
  const fakeEncrypter = makeFakeEncrypter();
  return new CreateUserService(fakeEncrypter, fakeRepository);
};

const makeFakeUserInput = (): createUserData => ({
  name: 'any_name',
  email: 'any_mail@mail.com',
  nick: 'any_nick@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password',
});

describe('CreateUserService', () => {
  it('should create and return a user', async () => {
    const sut = makeSut();
    const user = await sut.run(makeFakeUserInput());
    expect(user).toHaveProperty('id');
  });

  it('should throws if password does not match', async () => {
    const sut = makeSut();
    const user = sut.run({
      ...makeFakeUserInput(),
      passwordConfirmation: 'none',
    });

    expect(user).rejects.toThrow();
  });
});
