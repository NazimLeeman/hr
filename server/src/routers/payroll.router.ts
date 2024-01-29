import { Router } from "express";
import { getPayrollOfEmployee, postPayrollToEmployee, sendPayroll } from "../controllers/payroll.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get('/:employeeId', getPayrollOfEmployee);
router.post('/new',authMiddleware, postPayrollToEmployee);
router.post('/send/mail', sendPayroll);

export default router;