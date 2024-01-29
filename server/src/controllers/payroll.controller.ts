import { Request, Response } from "express";
import { createPayrollForEmployee, findPayrollOfEmployee } from "../models/payroll/payroll.query";
import { sendPayrollEmail } from "../services/nodeMailer/emailSender";
import { AuthRequest } from "../interfaces/authRequest.interface";

export async function postPayrollToEmployee (req: AuthRequest, res: Response) {
    try {
      // let id = req.params.id;
      // const restaurantId = Number(id);
      const restaurantId = req.user?.employeeInformation.restaurantId;
      if ( restaurantId) {
        const { employeeId, hourlyRate, totalHours, totalDeduction } = req.body;
        if (
            typeof hourlyRate === 'number' &&
            typeof totalHours === 'number' &&
            typeof totalDeduction === 'number') {
          const schedule = await createPayrollForEmployee(employeeId, restaurantId, {hourlyRate, totalHours, totalDeduction});
          res.status(201).json(schedule);
        } else res.status(400).json({ message: "Invalid employee ID." });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  export async function getPayrollOfEmployee (req: Request, res: Response) {
    try {
    //   let id = req.params.id;
    //   const restaurantId = Number(id);
      const employeeId = Number(req.params.employeeId);
      if (employeeId) {
        const schedule = await findPayrollOfEmployee(employeeId);
        res.json({ data: schedule });
      } else res.status(400).json({ message: "Invalid employee ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  export async function sendPayroll(req: Request, res: Response) {
    try {
      const { to, subject, content } = req.body;
      sendPayrollEmail(to, subject, content);
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.log(error);
      res.status(500).json(error)
    }
  }