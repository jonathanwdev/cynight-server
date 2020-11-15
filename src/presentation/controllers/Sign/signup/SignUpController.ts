import { MissingParamError, InvalidParamError } from '@/presentation/errors';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/HTTP';
import { badRequest, serverError } from '@/presentation/helpers/httpHelper';
import { Controller } from '@/presentation/protocols/controller';
import { EmailValidator } from '@/validation/protocols/emailValidator';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  public handle(httpRequest: HttpRequest): HttpResponse {
    try {
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

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return null;
    } catch (error) {
      return serverError();
    }
  }
}
