import {
  MissingParamError,
  InvalidParamError,
} from '@/shared/presentation/errors';
import {
  badRequest,
  serverError,
  okay,
} from '@/shared/presentation/helpers/httpHelper';
import {
  HttpRequest,
  HttpResponse,
  Controller,
  IEmailValidator,
  ICreateAccount,
} from './importHandler';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly createAccount: ICreateAccount,
  ) {}

  public async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password, passwordConfirmation } = httpRequest.body;
      const requiredFields = [
        'name',
        'email',
        'nick',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      delete httpRequest.body.passwordConfirmation;

      const account = await this.createAccount.create(httpRequest.body);
      return okay(account);
    } catch (error) {
      return serverError();
    }
  }
}
