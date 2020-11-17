import { IEmailValidator } from '@/shared/validation/protocols/IEmailValidator';
import validator from 'validator';

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
