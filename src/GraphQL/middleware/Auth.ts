import jwtConfig from '@Config/jwtConfig';
import { ServerError } from '@Helpers/AppoloError';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { MiddlewareFn, ResolverData } from 'type-graphql';

type requestCtx = {
  userId: string;
} & Request;

export type MyContext = {
  req?: requestCtx;
};

export const isAuthenticated: MiddlewareFn = async (
  { context }: ResolverData<MyContext>,
  next,
) => {
  const tokenExist = context?.req?.headers?.authorization;
  if (!tokenExist) {
    throw new ServerError('Token is missing !');
  }

  try {
    const decoded = verify(tokenExist, jwtConfig.secredt);
    const { sub } = decoded;
    context.req!.userId = sub as string;

    return next();
  } catch (err) {
    throw new ServerError(err);
  }
};
