import { Request, Response } from "express";
import { createScheduleForEmployee, updateScheduleForEmployee, findAllScheduleOfEmployee, findAllScheduleInRestaurant } from "../models/schedule/schedule.query";


export async function postScheduleToEmployee (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      const employeeId = Number(req.params.employeeId);
      if (id && employeeId && restaurantId) {
        const { day, slotStart, slotEnds } = req.body;
        if (
            typeof day === 'string' &&
            typeof slotStart === 'number' &&
            typeof slotEnds === 'number') {
          const schedule = await createScheduleForEmployee(employeeId, restaurantId, {day, slotStart, slotEnds});
          res.status(201).json(schedule);
        } else res.status(400).json({ message: "Invalid employee ID." });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

export async function getAllScheduleOfRestaurant (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      if (id && restaurantId) {
        const schedule = await findAllScheduleInRestaurant(restaurantId);
        res.json({ data: schedule });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  export async function getAllScheduleOfEmployee (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      const employeeId = Number(req.params.employeeId);
      if (id && employeeId) {
        const schedule = await findAllScheduleOfEmployee(employeeId, restaurantId);
        res.json({ data: schedule });
      } else res.status(400).json({ message: "Invalid employee ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  export async function updateScheduleOfEmployee (req: Request, res: Response) {
    try {
        const employeeId = Number(req.params.employeeId);
        const scheduleId = Number(req.params.scheduleId);
        if (employeeId && scheduleId) {
            const { day, slotStart, slotEnds } = req.body;
            if (
                typeof day === 'string' &&
                typeof slotStart === 'number' &&
                typeof slotEnds === 'number') {
              const schedule = await updateScheduleForEmployee( employeeId, scheduleId,{day, slotStart, slotEnds});
              res.status(201).json(schedule);
            } else res.status(400).json({ message: "Invalid employee ID." });
          } else res.status(400).json({ message: "Invalid schedule ID." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
  }