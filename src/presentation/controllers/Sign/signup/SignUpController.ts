import { MissingParamError } from '@/presentation/errors/MissinParamError';
import { HttpRequest, HttpResponse } from '@/presentation/protocols/HTTP';

export class SignUpController {
  public handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email'),
      };
    }
    return null;
  }
}
