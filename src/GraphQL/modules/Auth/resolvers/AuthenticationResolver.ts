import AuthenticationFactory from '@Modules/Auth/factories/AuthenticationServiceFactory';
import {
  authResponse,
  authenticaionData,
} from '@Modules/Auth/Services/AuthenticationService';
import { Resolver, Query, Arg } from 'type-graphql';

import { AuthenticationInput, AuthenticationResponse } from '../Inputs/Auth';

@Resolver()
export class AuthResolver {
  @Query(() => AuthenticationResponse, { nullable: true })
  public async Authentication(
    @Arg('data', () => AuthenticationInput) data: authenticaionData,
  ): Promise<authResponse | undefined> {
    const authFactory = AuthenticationFactory();
    const { auth } = await authFactory.run(data);
    return auth;
  }
}
