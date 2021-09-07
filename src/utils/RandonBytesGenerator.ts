import crypto from 'crypto';

import { IRandonbytesGenerator } from './usecases/IRandonBytesGenerator';

export class RandonByteaGenerator implements IRandonbytesGenerator {
  public generateRandonBytes(): string {
    const date = new Date().toISOString();
    const bytes = crypto.randomBytes(10).toString('HEX');
    const randonBytes = `${bytes}-${date}`;
    return randonBytes;
  }
}
