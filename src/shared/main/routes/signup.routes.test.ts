import request from 'supertest';
import connection from '../../infra/database/helpers/DatabaseConn';
import app from '../config/app';

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clearDefault();
  });
  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Joselito',
        email: 'joselito@mail.com',
        nick: 'jos107',
        isInfluencer: false,
        password: '123456',
        passwordConfirmation: '123456',
      })
      .expect(200);
  });
});
