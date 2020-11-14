import { MissingParamError } from '@/presentation/errors/MissinParamError';
import { SignUpController } from './SignUpController';

describe('SignUpController', () => {
  it('should  return 400 if no name is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        nick: 'any_nick',
        isInfluencer: false,
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should  return 400 if no email is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        nick: 'any_nick',
        isInfluencer: false,
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should  return 400 if no nick is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        isInfluencer: false,
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError('nick'));
  });

  it('should  return 400 if no  isInfluencer provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        nick: 'any_nick',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError('isInfluencer'));
  });

  it('should  return 400 if no  password provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        nick: 'any_nick',
        isInfluencer: true,
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });
});
