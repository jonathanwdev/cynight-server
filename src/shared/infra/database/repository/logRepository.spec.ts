import connection from '@/shared/infra/database/helpers/DatabaseConn';
import { getMongoRepository, MongoRepository } from 'typeorm';
import LogError from '../schemas/LogError';
import { LogMongoRepository } from './LogMongoRepository';

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

describe('Name of the group', () => {
  let errorRepository: MongoRepository<LogError>;

  beforeAll(async () => {
    await connection.create();
  });

  beforeEach(async () => {
    await connection.clearMongo();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError('any_error');
    errorRepository = getMongoRepository(LogError, 'mongo');
    const count = await errorRepository.count();
    expect(count).toBe(1);
  });
});
