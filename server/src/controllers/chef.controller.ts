import { Request, Response } from "express";
import { gettingAllActiveChefs } from "../models/attendance/attendance.query";

export async function getAllChefs(req: Request, res: Response) {
    try {
        let restaurantId = Number(req.params.restaurantId);
        if (restaurantId) {
        const activeChefs = await gettingAllActiveChefs(restaurantId);
        res.json({ data: activeChefs });
      } else res.status(400).json({ message: "Invalid restaurant ID." });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}