import { HttpResponse } from '../protocols/HTTP';

export const BadRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
