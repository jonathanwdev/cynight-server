import { MissingParamError } from '@/presentation/errors/MissinParamError';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/HTTP';
import { BadRequest } from '@/presentation/helpers/httpHelper';

export class SignUpController {
  public handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'email',
      'nick',
      'influencer',
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
