import { SignUpController } from '@/modules/Sign/presentation/controllers/signup/SignUpController';
import { EmailValidatorAdapter } from '@/shared/infra/validators/emailValidatorAdapter';
import { DBcreateAccount } from '@/modules/Sign/data/usecases/CreateAccount/DBcreateAccount';
import { AccountRepository } from '../../../infra/database/typeorm/repository/AccountRepository';
import { BcryptAdapter } from '../../../infra/cryptography/bcryptAdapter/BcryptAdapter';

export const makeSignUpController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter();
  const hasher = new BcryptAdapter(12);
  const accountRepository = new AccountRepository();
  const dbCreateAccount = new DBcreateAccount(hasher, accountRepository);
  return new SignUpController(emailValidator, dbCreateAccount);
};
