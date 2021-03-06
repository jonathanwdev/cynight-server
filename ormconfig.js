require('dotenv/config')

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.ENVIRONMENT === 'development' ? 'tests' : 'cynight',
    dropSchema: true,
    logging: false,
    synchroize: true,
    migrationsRun: true,
    entities: [
      './src/shared/infra/database/entities/*.ts'
    ],
    migrations: [
      './src/shared/infra/database/migrations/*.ts'
    ],
    cli: {
      entitiesDir: './src/shared/infra/database/entities',
      migrationsDir: './src/shared/infra/database/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    url: process.env.MONGO_URL,
    database: process.env.MONGO_DBNAME,
    synchronize: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    entities: [
      './src/shared/infra/database/schemas/*.ts'
    ]
  }
  
];