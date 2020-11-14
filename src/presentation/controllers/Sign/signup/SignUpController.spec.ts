import { MissingParamError } from '@/presentation/errors/MissinParamError';
import { SignUpController } from './SignUpController';

describe('SignUpController', () => {
  it('should  return 400 if no name is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        nick: 'any_nick',
        influencer: false,
        avatar: 'any_avatar',
        inTheNight: 'any_inTheNight',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });
  it('should  return 400 if no name is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        nick: 'any_nick',
        influencer: false,
        avatar: 'any_avatar',
        inTheNight: 'any_inTheNight',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });
  it('should  return 400 if no name is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        influencer: false,
        avatar: 'any_avatar',
        inTheNight: 'any_inTheNight',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError('nick'));
  });
});
