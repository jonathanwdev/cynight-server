import DBconnection from '../infra/database/helpers/PgHelper';
import app from './config/app';

DBconnection.create()
  .then(() => {
    app.listen(process.env.APP_PORT, () =>
      console.log(
        `server running at: http://localhost:${process.env.APP_PORT}`,
      ),
    );
  })
  .catch(console.error);
