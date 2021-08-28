const connection = {
  development: {
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
  production : {
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
  }
};

module.exports = connection[process.env.NODE_ENV];