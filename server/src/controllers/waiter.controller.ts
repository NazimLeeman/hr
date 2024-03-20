import { Request, Response } from "express";
import { createWaiterEfficiency } from "../models/performanceWaiter/performanceWaiter.query";

export async function postWaiterEfficiency(req: Request, res: Response) {
  try {
    const {
      waiterId,
      orderId,
      date,
      preparationTime,
      orderReadyToServeTime,
      bill,
      occupiedToCompleteTime,
      restaurantId,
    } = req.body;
    const efficiency = await createWaiterEfficiency({
      employeeId: waiterId,
      orderId,
      date,
      preparationTime,
      orderReadyToServeTime,
      bill,
      occupiedToCompleteTime,
      restaurantId,
    });
    if (efficiency) {
      res.json({ efficiency: efficiency });
    } else {
      res.status(400).json({ message: "Invalid Waiter ID." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
