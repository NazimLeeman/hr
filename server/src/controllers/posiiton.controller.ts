import { Request, Response } from "express";
import { createPositionForEmployee } from "../models/position/position.query";

export async function postPositionToEmployee (req: Request, res: Response) {
    try {
        const restaurantId = Number(req.params.id);
        const employeeId = Number(req.params.employeeId);
        if (employeeId && restaurantId) {
            const { name } = req.body;
            if( typeof name === "string") {
                const position = await createPositionForEmployee(employeeId, restaurantId, {name});
                res.status(201).json(position);
            }else res.status(400).json({ message: "Invalid employee ID."})
        }else res.status(400).json({ message: "Invalid restaurant ID."})
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}