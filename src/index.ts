import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { join } from 'path';
import { buildSchema } from 'type-graphql';

import './database/DatabaseConection';

(async () => {
  const app = express();

  const schema = await buildSchema({
    resolvers: [`${__dirname}/GraphQL/modules/**/resolvers/*.ts`],
    validate: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.use('/images', express.static(join(__dirname, '../tmp')));

  const port = process.env.SERVER_PORT || 4000;
  app.listen(port, () => {
    console.log(`working at http://localhost:${port}/graphql`);
  });
})();
