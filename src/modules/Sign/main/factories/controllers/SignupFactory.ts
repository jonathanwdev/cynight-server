import { SignUpController } from '@/modules/Sign/presentation/controllers/signup/SignUpController';
import { EmailValidatorAdapter } from '@/shared/infra/validators/emailValidatorAdapter';
import { DBcreateAccount } from '@/modules/Sign/data/usecases/CreateAccount/DBcreateAccount';
import { Controller } from '@/shared/presentation/protocols';
import { LogControllerDecorator } from '@/shared/main/decorators/log';
import { LogMongoRepository } from '@/shared/infra/database/repository/LogMongoRepository';
import { AccountRepository } from '../../../infra/database/typeorm/repository/AccountRepository';
import { BcryptAdapter } from '../../../infra/cryptography/bcryptAdapter/BcryptAdapter';

export const makeSignUpController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter();
  const hasher = new BcryptAdapter(12);
  const accountRepository = new AccountRepository();
  const dbCreateAccount = new DBcreateAccount(hasher, accountRepository);
  const signUpController = new SignUpController(
    emailValidator,
    dbCreateAccount,
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logMongoRepository);
};
