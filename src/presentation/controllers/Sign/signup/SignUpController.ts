import { MissingParamError } from '@/presentation/errors/MissinParamError';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/HTTP';
import { BadRequest } from '@/presentation/helpers/httpHelper';

export class SignUpController {
  public handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return BadRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return BadRequest(new MissingParamError('email'));
    }
    return null;
  }
}
