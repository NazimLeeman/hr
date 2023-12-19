import express, { Express } from 'express';
import config from './config';
import sequelize from './models';
import employeeRouter from './routers/employee.router';
import applicantRouter from './routers/applicant.router'

const app: Express = express();

app.use(express.json());

app.use('/employee', employeeRouter);
app.use('/applicant', applicantRouter);

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