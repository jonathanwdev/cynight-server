import app from './config/app';
import '../infra/database';

app.listen(process.env.APP_PORT, () =>
  console.log(`server running at: http://localhost:${process.env.APP_PORT}`),
);
