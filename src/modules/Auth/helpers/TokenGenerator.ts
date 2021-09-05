import { ServerError } from '@Helpers/AppoloError';
import jwt from 'jsonwebtoken';

import {
  ITokenGenerator,
  TokenGeneratorData,
} from './usecases/ITokenGenerator';

export class TokenGenerator implements ITokenGenerator {
  generate(data: TokenGeneratorData): string {
    try {
      const { expiresIn, secret, userId } = data;
      return jwt.sign({}, secret, {
        subject: userId,
        expiresIn,
      });
    } catch (err) {
      throw new ServerError(err);
    }
  }
}
