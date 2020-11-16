import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from '@/presentation/errors';
import { IEmailValidator } from '@/validation/protocols/IEmailValidator';
import { User } from '@/domain/typeorm/entities/User';
import {
  ICreateAccount,
  ICreateAccountModel,
} from '@/domain/usecases/ICreateAccount';
import { SignUpController } from './SignUpController';

const makeFakeAccountRequest = () => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    nick: 'any_nick',
    isInfluencer: true,
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeCreateAccount = (): ICreateAccount => {
  class CreateAccountStub implements ICreateAccount {
    async create(account: ICreateAccountModel): Promise<User> {
      return {
        id: 'any_id',
        email: 'any_email@mail.com',
        name: 'any_name',
        nick: 'any_nick',
        isInfluencer: true,
        password: 'any_password',
      };
    }
  }
  return new CreateAccountStub();
};

const makeFakeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

type SutTypes = {
  sut: SignUpController;
  emailValidatorStub: IEmailValidator;
  createAccountStub: ICreateAccount;
};

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeFakeEmailValidator();
  const createAccountStub = makeCreateAccount();
  const sut = new SignUpController(emailValidatorStub, createAccountStub);
  return {
    sut,
    emailValidatorStub,
    createAccountStub,
  };
};

describe('SignUpController', () => {
  it('should  return 400 if no name is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        nick: 'any_nick',
        isInfluencer: true,
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should  return 400 if no email is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        nick: 'any_nick',
        isInfluencer: true,
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should  return 400 if no n ick is provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        isInfluencer: true,
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('nick'));
  });

  it('should  return 400 if no  isInfluencer provided', () => {
    const { sut } = makeSut();
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('isInfluencer'));
  });

  it('should  return 400 if no  password provided', () => {
    const { sut } = makeSut();
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
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should  return 400 if no  passwordConfirmation provided', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        nick: 'any_nick',
        isInfluencer: true,
        password: 'any_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  it('should  return 400 if passwordConfirmation fails', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        nick: 'any_nick',
        isInfluencer: true,
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation'),
    );
  });

  it('should  return 400 if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpResponse = sut.handle({
      body: {
        name: 'any_name',
        email: 'invalid_email@mail.com',
        nick: 'any_nick',
        isInfluencer: true,
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('should  call  emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const emailSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.handle(makeFakeAccountRequest());
    expect(emailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('should  return 500 if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = sut.handle(makeFakeAccountRequest());
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('should  addAccount with correct values', () => {
    const { sut, createAccountStub } = makeSut();
    const createAccountSpy = jest.spyOn(createAccountStub, 'create');
    sut.handle(makeFakeAccountRequest());
    expect(createAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      nick: 'any_nick',
      isInfluencer: true,
      password: 'any_password',
    });
  });
});
