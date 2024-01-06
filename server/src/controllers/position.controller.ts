import { Request, Response } from "express";
import { createEmployeeServiceAccess, findEmployeeServiceAccess, updateEmployeeServiceAccess, findAllPositionInRestaurant } from "../models/position/position.query";
import { validateServices } from "../utils/validation.helper";
import { findEmployeeById } from "../models/employee/employee.query";
import { updateEmployeePositionId } from "../models/employeeLogin/employeeLogin.query";

// export async function postPositionToEmployee (req: Request, res: Response) {
//     try {
//         const restaurantId = Number(req.params.id);
//         const employeeId = Number(req.params.employeeId);
//         if (employeeId && restaurantId) {
//             const { name } = req.body;
//             if( typeof name === "string") {
//                 const position = await createPositionForEmployee(employeeId, restaurantId, {name});
//                 res.status(201).json(position);
//             }else res.status(400).json({ message: "Invalid employee ID."})
//         }else res.status(400).json({ message: "Invalid restaurant ID."})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// }

export async function postPositionAccess (req: Request, res: Response) {
    try {
      // const id = Number(req.params.id);
      const restaurantId = Number(req.params.restaurantId);
      const { employeeId, services, position } = req.body;
      const employee = await findEmployeeById(employeeId);
      if (employee && validateServices(services)) {
        const prevServiceAccess = await findEmployeeServiceAccess(employee.id);
        let access;
        const data = {    
          employeeId: employee.id, 
          services,
          position,
          restaurantId
        }
        if (prevServiceAccess)
          access = await updateEmployeeServiceAccess(prevServiceAccess.id, data);
        else
          access = await createEmployeeServiceAccess(data);
          const positionId = access.id; 

          await updateEmployeePositionId(employee.id, positionId);
  
        res.status(201).send({ status: "success", access });
      } else res.status(400).send({ message: 'Invalid employee ID or services.'})
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message });
    }
  }
  
  export async function checkPositionAccess (req: Request, res: Response) {
    try {
      const { employeeId, service } = req.body;
      const employee = await findEmployeeById(employeeId);
      if (employee && typeof service === 'string') {
        const serviceAccess = await findEmployeeServiceAccess(employee.id);
        if (serviceAccess && (serviceAccess.services.includes("all") || serviceAccess.services.includes(service))) {
          res.status(200).send({ status: 'success', auth: true });
        } else res.status(400).send({ status: 'fail', auth: false });
      } else res.status(400).send({ message: 'Invalid employee ID or services.'})
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: (error as Error).message });
    }
  }

export async function getAllPositionsFromRestaurant (req: Request, res: Response) {
    try {
        const restaurantId = Number(req.params.id);
        if(restaurantId) {
            const position = await findAllPositionInRestaurant(restaurantId);
            res.json({ data: position});
        } else res.status(400).json({ message: "Invalid restaurant Id."})
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}