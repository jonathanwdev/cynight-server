import { IHasher } from '@/modules/Sign/data/protocols/cryptography/IHasher';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements IHasher {
  constructor(public readonly salt: number) {}

  public async hash(value: string): Promise<string> {
    await bcrypt.hash(value, this.salt);
    return new Promise(resolve => resolve(null));
  }
}
