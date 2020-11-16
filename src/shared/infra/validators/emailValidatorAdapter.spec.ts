import { EmailValidatorAdapter } from './emailValidatorAdapter';

describe('EmailValidator Adapter', () => {
  it('Should return false if validation returns false', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });
});
