import express from "express";
import { createConnection } from "typeorm";
import setGlobalMiddleware from "./middlewares/global";
import { restRouter } from "./routes";
import { errorHandler } from "./routes/errorHandler";

(async () => {
  const app = express();

  setGlobalMiddleware(app);

  app.use('/api', restRouter);
  app.use(errorHandler);

  // catch all
  app.all('*', (_, res) => {
    res.json({error: 'unexpected error'})
  });


  await createConnection();

  app.listen(process.env.APP_PORT || 4000, () => {
    console.log(`Express listening port: ${process.env.APP_PORT || 4000}`);
  });
})();
