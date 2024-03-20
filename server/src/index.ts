import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import sequelize from "./models";
import employeeRouter from "./routers/employee.router";
import applicantRouter from "./routers/applicant.router";
import scheduleRouter from "./routers/schedule.router";
import jobRouter from "./routers/job.router";
import positionRouter from "./routers/position.router";
import attendanceRouter from "./routers/attendance.router";
import payrollRouter from "./routers/payroll.router";
import jobApplicantRouter from "./routers/jobApplicant.router";
import authRouter from "./routers/auth.router";
import chefRouter from "./routers/chef.router";
import waiterRouter from "./routers/waiter.router";
import restaurantRouter from "./routers/restaurant.router";

const app: Express = express();

app.use(
  cors({
    origin: config.CORS_ORIGIN.split(","),
    exposedHeaders: ["Authorization"],
  })
);

const bodyParserConfig = {
  limit: "50mb",
};

app.use(bodyParser.json(bodyParserConfig));
app.use(bodyParser.urlencoded({ extended: true, ...bodyParserConfig }));

app.use(express.json());

app.use("/applicant", applicantRouter);
app.use("/employee", employeeRouter);
app.use("/schedule", scheduleRouter);
app.use("/job", jobRouter);
app.use("/position", positionRouter);
app.use("/attendance", attendanceRouter);
app.use("/payroll", payrollRouter);
app.use("/jobApplicant", jobApplicantRouter);
app.use("/auth", authRouter);
app.use("/chef", chefRouter);
app.use("/waiter", waiterRouter);
app.use("/restaurant", restaurantRouter);

(async function bootstrap() {
  try {
    await sequelize.sync();
    app.listen(config.PORT, () => {
      console.log(`[server]: Server is running on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
