import DatabaseConn from '../infra/database/helpers/DatabaseConn';

DatabaseConn.create()
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(process.env.APP_PORT, () =>
      console.log(`Running at ${process.env.APP_PORT}`),
    );
  })
  .catch(console.error);
