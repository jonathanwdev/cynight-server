import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

describe('Bcrypt Adapter', () => {
  it('should  calls bcrypt with correct values', async () => {
    const salt = 12;
    const sut = new BcryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
