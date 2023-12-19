import express, { Express } from 'express';
import config from './config';
import sequelize from './models';
import employeeRouter from './routers/employee.router';

const app: Express = express();

app.use(express.json());

app.use('/employee', employeeRouter);

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