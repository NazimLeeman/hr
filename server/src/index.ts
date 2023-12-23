import express, { Express } from 'express';
import config from './config';
import sequelize from './models';
import employeeRouter from './routers/employee.router';
import applicantRouter from './routers/applicant.router';
import scheduleRouter from './routers/schedule.router';
import jobRouter from './routers/job.router';
import positionRouter from './routers/position.router';
import attendanceRouter from './routers/attendance.router'

const app: Express = express();

app.use(express.json());

app.use('/employee', employeeRouter);
app.use('/applicant', applicantRouter);
app.use('/schedule', scheduleRouter);
app.use('/job', jobRouter);
app.use('/position', positionRouter);
app.use('/attendance', attendanceRouter);

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