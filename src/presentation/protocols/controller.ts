import { HttpRequest, HttpResponse } from './HTTP';

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
