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
      './src/modules/**/infra/database/typeorm/entities/*.ts'
    ],
    migrations: [
      './src/shared/infra/database/migrations/*.ts'
    ],
    cli: {
      entitiesDir: './src/modules/**/infra/database/typeorm/entities',
      migrationsDir: './src/shared/infra/database/migrations',
    },
  },
  
];