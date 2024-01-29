import { Router } from "express";
import { postScheduleToEmployee, getAllScheduleOfRestaurant, updateScheduleOfEmployee, getAllScheduleOfEmployee } from "../controllers/schedule.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get('/restaurant', authMiddleware, getAllScheduleOfRestaurant);
router.get('/:employeeId/restaurant',authMiddleware, getAllScheduleOfEmployee);

router.put('/:employeeId/restaurant/:scheduleId', updateScheduleOfEmployee);
router.post('/restaurant',authMiddleware, postScheduleToEmployee);

export default router;