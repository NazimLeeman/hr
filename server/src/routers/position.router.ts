import { Router } from "express";
import { postPositionToEmployee, getAllPositionsFromRestaurant } from "../controllers/posiiton.controller";
const router = Router();

router.get('/:id/restaurant/', getAllPositionsFromRestaurant);
router.post('/:id/restaurant/:employeeId', postPositionToEmployee)


export default router;
