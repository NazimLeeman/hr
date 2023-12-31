import { Request, Response } from "express";
import { createPayrollForEmployee, findPayrollOfEmployee } from "../models/payroll/payroll.query";


export async function postPayrollToEmployee (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      if (id && restaurantId) {
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