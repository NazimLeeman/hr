import { Request, Response } from "express";
import { findAllEmployeeInRestaurant, addEmployeeToRestaurant } from "../models/employee/employee.query";

export async function getAllEmployeeOfRestaurant (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      if (id && restaurantId) {
        const employee = await findAllEmployeeInRestaurant(restaurantId);
        res.json({ data: employee });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  
  export async function postEmployeeToRestaurant (req: Request, res: Response) {
    try {
      let id = req.params.id;
      const restaurantId = Number(id);
      if (id && restaurantId) {
        const { name, email, phoneNumber, joiningDate, address } = req.body;
        if (
            typeof name === 'string' &&
            typeof email === 'string' &&
            typeof phoneNumber === 'number') {
          const employee = await addEmployeeToRestaurant(restaurantId, {name, email, phoneNumber, joiningDate, address});
          res.status(201).json(employee);
        } else res.status(400).json({ message: "Invalid employee information." });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
  
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
  