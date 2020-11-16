import { MissingParamError, InvalidParamError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers/httpHelper';
import {
  HttpRequest,
  HttpResponse,
  Controller,
  IEmailValidator,
  ICreateAccount,
} from './exportProtocols';

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly createAccount: ICreateAccount,
  ) {}

  public handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const { email, password, passwordConfirmation } = httpRequest.body;
      const requiredFields = [
        'name',
        'email',
        'nick',
        'isInfluencer',
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

      const account = this.createAccount.create(httpRequest.body);
      return {
        statusCode: 200,
        body: account,
      };
    } catch (error) {
      return serverError();
    }
  }
}
