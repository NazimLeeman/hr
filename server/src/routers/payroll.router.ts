import { Router } from "express";
import { getPayrollOfEmployee, postPayrollToEmployee } from "../controllers/payroll.controller";
const router = Router();

router.get('/:employeeId', getPayrollOfEmployee);
router.post('/:id', postPayrollToEmployee);

export default router;