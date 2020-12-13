import { LogErrorRepository } from '@/shared/data/protocols/logErrorRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import LogError from '../schemas/LogError';

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const ormRepository: MongoRepository<LogError> = getMongoRepository(
      LogError,
      'mongo',
    );
    await ormRepository.insertOne({
      stack,
    });
  }
}
