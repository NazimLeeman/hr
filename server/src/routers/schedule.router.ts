import { Router } from "express";
import { postScheduleToEmployee, getAllScheduleOfRestaurant, updateScheduleOfEmployee, getAllScheduleOfEmployee } from "../controllers/schedule.controller";
const router = Router();

router.get('/restaurant/:id', getAllScheduleOfRestaurant);
router.get('/:employeeId/restaurant/:id', getAllScheduleOfEmployee);

router.put('/:employeeId/restaurant/:scheduleId', updateScheduleOfEmployee);
router.post('/:id/restaurant', postScheduleToEmployee);

export default router;