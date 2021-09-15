import { UnauthorizedError } from '@Helpers/AppoloError';
import User from '@Typeorm/entity/User';
import { MiddlewareFn, ResolverData } from 'type-graphql';

import { MyContext } from './Auth';

export const isValidUser: MiddlewareFn = async (
  { context }: ResolverData<MyContext>,
  next,
) => {
  const { userId } = context.req!;

  if (!userId) {
    throw new UnauthorizedError('Connected User does not exist!');
  }

  const userExist = await User.findOne(userId, {
    where: { deleted_at: null },
  });

  if (!userExist) {
    throw new UnauthorizedError('Connected User does not exist!');
  }

  return next();
};
