import '../infra/database';
import 'dotenv/config';
import express from 'express';

const app = express();

app.listen(process.env.APP_PORT, () =>
  console.log(`server running at: http://localhost:${process.env.APP_PORT}`),
);
