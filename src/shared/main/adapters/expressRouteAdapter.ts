import { Controller, HttpRequest } from '@/shared/presentation/protocols';
import { Request, Response } from 'express';

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpRequest: HttpRequest = {
      body: request.body,
      query: request.query,
      params: request.params,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      response.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
