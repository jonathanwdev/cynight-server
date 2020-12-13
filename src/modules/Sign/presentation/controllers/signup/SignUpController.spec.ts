import { IUser } from '@/modules/Sign/domain/models/IUser';
import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from '@/shared/presentation/errors';
import Mockdate from 'mockdate';
import {
  okay,
  serverError,
  badRequest,
} from '@/shared/presentation/helpers/httpHelper';
import {
  ICreateAccountModel,
  ICreateAccount,
  IEmailValidator,
} from './importHandler';
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

const makeCreateAccount = (): ICreateAccount => {
  class CreateAccountStub implements ICreateAccount {
    async create(account: ICreateAccountModel): Promise<IUser> {
      return new Promise(resolve => resolve(makeFakeAccount()));
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
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });
  it('should  return 400 if no name is provided', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')));
  });

  it('should  return 400 if no email is provided', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  it('should  return 400 if no nick is provided', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('nick')));
  });

  it('should  return 400 if no  password provided', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });

  it('should  return 400 if no  passwordConfirmation provided', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('passwordConfirmation')),
    );
  });

  it('should  return 400 if no isInfluencer is provided', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('isInfluencer')),
    );
  });

  it('should  return 400 if passwordConfirmation fails', async () => {
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
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError('passwordConfirmation')),
    );
  });

  it('should  return 400 if isInfluencer is undefined', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });

  it('should  call  emailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const emailSpy = jest.spyOn(emailValidatorStub, 'isValid');
    await sut.handle(makeFakeAccountRequest());
    expect(emailSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  it('should  return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should  addAccount with correct values', async () => {
    const { sut, createAccountStub } = makeSut();
    const createAccountSpy = jest.spyOn(createAccountStub, 'create');
    await sut.handle(makeFakeAccountRequest());
    expect(createAccountSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      nick: 'any_nick',
      isInfluencer: true,
      password: 'any_password',
    });
  });

  it('should  return 500 if createAccount throws', async () => {
    const { sut, createAccountStub } = makeSut();
    jest.spyOn(createAccountStub, 'create').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()));
    });
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should  return 200 valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeAccountRequest());
    expect(httpResponse).toEqual(okay(makeFakeAccount()));
  });
});
