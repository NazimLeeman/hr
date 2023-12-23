import { Router } from "express";
import { postAttendanceToEmployee, updateAttendanceOfEmployee } from "../controllers/attendance.controller";
const router = Router();

router.post('/:id/restaurant/:employeeId', postAttendanceToEmployee);
router.put('/:employeeId/restaurant/:attendanceId', updateAttendanceOfEmployee);

export default router;
