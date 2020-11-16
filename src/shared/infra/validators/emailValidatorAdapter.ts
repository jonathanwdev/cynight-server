import { IEmailValidator } from '@/shared/validation/protocols/IEmailValidator';

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid(email: string): boolean {
    return false;
  }
}
