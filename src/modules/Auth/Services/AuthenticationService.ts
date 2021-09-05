import config from '@Config/jwtConfig';
import { ServerError } from '@Helpers/AppoloError';
import { IPasswordEncrypter } from '@Utils/usecases/IPasswordEncrypter';

import { ITokenGenerator } from '../helpers/usecases/ITokenGenerator';
import { IAuthenticationRepository } from '../Repository/usecases/IAuthenticationRepository';

export type authenticaionData = {
  email: string;
  password: string;
};

export type authResponse = {
  user: {
    email: string;
    nick: string;
    name: string;
  };
  token: String;
};

export type authenticationResponse = {
  auth?: authResponse;
  id?: string;
};

class AuthenticationService {
  constructor(
    private readonly passwordEncrypter: IPasswordEncrypter,
    private readonly authRepository: IAuthenticationRepository,
    private readonly tokenGenerator: ITokenGenerator,
  ) {}

  public async run({
    password,
    email,
  }: authenticaionData): Promise<authenticationResponse> {
    try {
      if (!email || !password) {
        throw new ServerError('Email and password is required !');
      }
      const userExist = await this.authRepository.findAuthorizedUser(email);

      if (!userExist) {
        throw new ServerError('Invalid Email or Password !');
      }

      if (userExist.deleted_at) {
        throw new ServerError('Inactive user !');
      }

      const passwordMatcher = await this.passwordEncrypter.comparePassword({
        encryptedPassword: userExist.password,
        password,
      });

      if (!passwordMatcher) {
        throw new ServerError('Invalid Email or Password !');
      }

      const token = this.tokenGenerator.generate({
        expiresIn: config.expiresIn,
        secret: config.secredt,
        userId: userExist.id,
      });

      const auth: authResponse = {
        user: {
          email: userExist.email,
          name: userExist.name,
          nick: userExist.nick,
        },
        token,
      };

      return {
        id: userExist.id,
        auth,
      };
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default AuthenticationService;
