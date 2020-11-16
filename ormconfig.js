module.exports = [
  {
    'name': 'default',
    'type': 'postgres',
    'port': 5432,
    'host': 'localhost',
    'username': 'postgres',
    'password': 'root',
    'database': 'cynight',
    'entities': [
      './src/domain/typeorm/entities/*.ts'
    ],
    'migrations': [
      './src/shared/typeorm/migrations/*.ts'
    ],
    'cli': {
      'migrationsDir': './src/shared/typeorm/migrations',
    },
  },
  // {
  //   name: 'mongo',
  //   type: 'mongodb',
  //   host: process.env.MONGO_HOST,
  //   port: 27017,
  //   database: process.env.MONGO_NAME,
  //   useUnifiedTopology: true,
  //   entities: [
  //     './src/modules/**/infra/typeorm/schemas/*.ts'
  //   ]
  // }
];