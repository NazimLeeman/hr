import { Router } from "express";
import { postScheduleToEmployee, getAllScheduleOfRestaurant, updateScheduleOfEmployee } from "../controllers/schedule.controller";
const router = Router();

router.get('/restaurant/:id', getAllScheduleOfRestaurant);

router.put('/:employeeId/restaurant/:scheduleId', updateScheduleOfEmployee);
router.post('/:id/restaurant/:employeeId', postScheduleToEmployee);

export default router;