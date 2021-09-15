import { ApolloError } from 'apollo-server-express';

export class ServerError extends ApolloError {
  constructor(message: string, code = 'Internal Server Error') {
    super(message, code);

    Object.defineProperty(this, 'name', { value: 'ServerError' });
  }
}

export class MissingParamError extends ApolloError {
  constructor(message: string, code = 'Missing Param Error') {
    super(message, code);

    Object.defineProperty(this, 'name', { value: 'MissingParamError' });
  }
}

export class UnauthorizedError extends ApolloError {
  constructor(message: string, code = 'Unauthorized Error') {
    super(message, code);

    Object.defineProperty(this, 'name', { value: 'UnauthorizedError' });
  }
}

export class NotFoundError extends ApolloError {
  constructor(message: string, code = 'Not Found Error') {
    super(message, code);

    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}
