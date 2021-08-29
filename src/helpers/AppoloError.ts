import { ApolloError } from 'apollo-server-express';

export class ServerError extends ApolloError {
  constructor(message: string, code = 'Internal Server Error') {
    super(message, code);

    Object.defineProperty(this, 'name', { value: 'ServerError' });
  }
}
