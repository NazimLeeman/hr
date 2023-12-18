import express, { Express } from 'express';
import config from './config';
import sequelize from './models';

const app: Express = express();

app.use(express.json());

(async function bootstrap () {
    try {
      await sequelize.sync();
      app.listen(config.PORT, () => {
        console.log(`[server]: Server is running on port ${config.PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  })();