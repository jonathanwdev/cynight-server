import { createConnections, getConnection } from 'typeorm';

const connection = {
  async create(): Promise<void> {
    await createConnections();
  },

  async close(): Promise<void> {
    Promise.all([
      await getConnection('default').close(),
      await getConnection('mongo').close(),
    ]);
  },

  async clear(): Promise<void> {
    const conn1 = getConnection('default');
    const entities1 = conn1.entityMetadatas;

    entities1.forEach(async entity => {
      const repository = conn1.getRepository(entity.name);
      await repository.clear();
    });

    const conn2 = getConnection('mongo');
    const entities2 = conn2.entityMetadatas;

    entities2.forEach(async entity => {
      const repository = conn2.getRepository(entity.name);
      await repository.clear();
    });
  },
};

export default connection;
