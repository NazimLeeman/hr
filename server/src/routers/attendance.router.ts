import { Router } from "express";
import { gettingAllActiveEmployees, postAttendanceToEmployee, updateAttendanceOfEmployee } from "../controllers/attendance.controller";
const router = Router();

router.post('/:id/restaurant/:employeeId', postAttendanceToEmployee);
router.put('/:employeeId/restaurant/:attendanceId', updateAttendanceOfEmployee);
router.get('/all/restaurant', gettingAllActiveEmployees)

export default router;
