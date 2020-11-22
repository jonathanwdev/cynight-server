import { getConnection } from 'typeorm';
import PgHelper from './PgHelper';

describe('PgHelper', () => {
  beforeAll(async () => {
    await PgHelper.create();
  });

  afterAll(async () => {
    await PgHelper.close();
  });
  it('should connect and disconect', async () => {
    const connectionStatus = await getConnection();
    expect(connectionStatus.isConnected).toBeTruthy();
  });
});
