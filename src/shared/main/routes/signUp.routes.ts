import { Router } from 'express';
import { makeSignUpController } from '../../../modules/Sign/main/factories/controllers/SignupFactory';
import { adaptRoute } from '../adapters/expressRouteAdapter';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
