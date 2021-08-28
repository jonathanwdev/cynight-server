import bcrypt from 'bcrypt';

import {
  IPasswordEncrypter,
  passwordComparerData,
  passwordEncrypterData,
} from './usecases/IPasswordEncrypter';

export class PasswordEncrypter implements IPasswordEncrypter {
  public async encrypt({
    password,
    salt = 8,
  }: passwordEncrypterData): Promise<string> {
    const passwordEncrypted = await bcrypt.hash(password, salt);
    return passwordEncrypted;
  }

  public async comparePassword({
    password,
    encryptedPassword,
  }: passwordComparerData): Promise<boolean> {
    const comparedPass = await bcrypt.compare(password, encryptedPassword);
    return comparedPass;
  }
}
