import { MissingParamError } from '@/presentation/errors/MissinParamError';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/HTTP';
import { BadRequest } from '@/presentation/helpers/httpHelper';
import { Controller } from '@/presentation/protocols/controller';

export class SignUpController implements Controller {
  public handle(httpRequest: HttpRequest): HttpResponse {
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

    return null;
  }
}
