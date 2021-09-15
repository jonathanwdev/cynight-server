const connection = {
  development: [
    { 
      name: "default",
      type: "postgres",
      database: process.env.DB_POSTGRES_NAME,
      host: process.env.DB_POSTGRES_HOST,
      username: process.env.DB_POSTGRES_USER,
      password: process.env.DB_POSTGRES_PASS,
      synchronize: true,
      logging: false,
      entities: ["./src/typeorm/entity/**/*.ts"],
      migrations: ["./src/typeorm/migration/*.ts"],
      subscribers: ["./src/typeorm/subscriber/*.ts"],
      cli: {
        entitiesDir: "./src/typeorm/entity",
        migrationsDir: "./src/typeorm/migration",
        subscribersDir: "./src/typeorm/subscriber"
      }
    },
    {
      name: 'mongo',
      type: 'mongodb',
      host: process.env.DB_MONGO_HOST,
      port: process.env.DB_MONGO_PORT,
      database: process.env.DB_MONGO_NAME,
      useUnifiedTopology: true,
      entities: [
        './src/typeorm/schemas/**/*.ts'
      ]
    }
  ],
  production : [
    {
      name: "default",
      type: "postgres",
      url: process.env.DATABASE_URL,
      synchronize: true, 
      logging: false,
      entities: ["dist/typeorm/entity/**/*.js"],
      migrations: ["dist/typeorm/migration/*.js"],
      subscribers: ["dist/typeorm/subscriber/*.js"],
      cli: {
        entitiesDir: "dist/typeorm/entity",
        migrationsDir: "dist/typeorm/migration",
        subscribersDir: "dist/typeorm/subscriber"
      }
    },
    {
      name: 'mongo',
      type: 'mongodb',
      host: process.env.MONGO_HOST,
      port: 27017,
      database: process.env.MONGO_NAME,
      useUnifiedTopology: true,
      entities: [
        'dist/typeorm/schemas/**/*.js'
      ]
    }
  ]
};

module.exports = connection[process.env.NODE_ENV];