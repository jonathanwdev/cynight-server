import { getConnection } from 'typeorm';
import DbConn from './DatabaseConn';

describe('DbConn', () => {
  beforeAll(async () => {
    await DbConn.create();
  });

  afterAll(async () => {
    await DbConn.close();
  });
  it('should connect and disconect', async () => {
    const connectionStatus = await getConnection();
    expect(connectionStatus.isConnected).toBeTruthy();
  });
});
