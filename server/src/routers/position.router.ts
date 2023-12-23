import { Router } from "express";
import { postPositionToEmployee } from "../controllers/posiiton.controller";
const router = Router();

router.post('/:id/restaurant/:employeeId', postPositionToEmployee)

export default router;
