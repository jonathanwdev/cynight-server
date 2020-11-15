import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from '@/presentation/errors';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/HTTP';
import { BadRequest } from '@/presentation/helpers/httpHelper';
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
          return BadRequest(new MissingParamError(field));
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return BadRequest(new InvalidParamError('email'));
      }

      return null;
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
