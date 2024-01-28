import { Router } from "express";
import { getPayrollOfEmployee, postPayrollToEmployee, sendPayroll } from "../controllers/payroll.controller";
const router = Router();

router.get('/:employeeId', getPayrollOfEmployee);
router.post('/:id', postPayrollToEmployee);
router.post('/send/mail', sendPayroll);

export default router;