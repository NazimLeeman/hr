import { Request, Response } from "express";
import {
  createEmployeeServiceAccess,
  findAllChefsInRestaurant,
  findEmployeeServiceAccess,
  updateEmployeeServiceAccess,
  findAllPositionInRestaurant,
  findAllWaitersInRestaurant,
} from "../models/position/position.query";
import { validateServices } from "../utils/validation.helper";
import { findEmployeeById } from "../models/employee/employee.query";
import { updateEmployeePositionId } from "../models/employeeLogin/employeeLogin.query";
import { AuthRequest } from "../interfaces/authRequest.interface";

export async function postPositionAccess(req: AuthRequest, res: Response) {
  try {
    const restaurantId = req.user?.employeeInformation.restaurantId;
    const { employeeId, services, position } = req.body;
    const employee = await findEmployeeById(employeeId);
    if (employee && validateServices(services)) {
      const prevServiceAccess = await findEmployeeServiceAccess(employee.id);
      let access;
      const data = {
        employeeId: employee.id,
        services,
        position,
        restaurantId,
      };
      if (prevServiceAccess)
        access = await updateEmployeeServiceAccess(prevServiceAccess.id, data);
      else {
        access = await createEmployeeServiceAccess(data);
      }
      const positionId = access.id;

      const result = await updateEmployeePositionId(employee.id, positionId);

      res.status(201).send({ status: "success", access, result });
    } else
      res.status(400).send({ message: "Invalid employee ID or services." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function checkPositionAccess(req: Request, res: Response) {
  try {
    const { employeeId, service } = req.body;
    const employee = await findEmployeeById(employeeId);
    if (employee && typeof service === "string") {
      const serviceAccess = await findEmployeeServiceAccess(employee.id);
      if (
        serviceAccess &&
        (serviceAccess.services.includes("all") ||
          serviceAccess.services.includes(service))
      ) {
        res.status(200).send({ status: "success", auth: true });
      } else res.status(400).send({ status: "fail", auth: false });
    } else
      res.status(400).send({ message: "Invalid employee ID or services." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: (error as Error).message });
  }
}

export async function getAllPositionsFromRestaurant(
  req: Request,
  res: Response
) {
  try {
    const restaurantId = Number(req.params.id);
    if (restaurantId) {
      const position = await findAllPositionInRestaurant(restaurantId);
      res.json({ data: position });
    } else res.status(400).json({ message: "Invalid restaurant Id." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getAllChefsFromRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      const position = await findAllChefsInRestaurant(restaurantId);
      res.json({ data: position });
    } else res.status(400).json({ message: "Invalid restaurant Id." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getAllWaitersFromRestaurant(req: Request, res: Response) {
  try {
    const restaurantId = Number(req.params.restaurantId);
    if (restaurantId) {
      const position = await findAllWaitersInRestaurant(restaurantId);
      res.json({ data: position });
    } else res.status(400).json({ message: "Invalid restaurant Id." });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
