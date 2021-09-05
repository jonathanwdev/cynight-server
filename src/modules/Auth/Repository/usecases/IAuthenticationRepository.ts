import User from '@Typeorm/entity/User';

export interface IAuthenticationRepository {
  findAuthorizedUser: (email: string) => Promise<User | undefined>;
}
