import { Router } from "express";
import { getAllEmployeeOfRestaurant, login, postApplicantToEmployee, postEmployeeToRestaurant } from "../controllers/employee.controller";
const router = Router();

router.get('/restaurant/:id', getAllEmployeeOfRestaurant);
// router.get('/:id/restaurant/:employeeId', searchEmployee);
router.post('/:id/restaurant/:applicantId', postApplicantToEmployee);
router.post('/signup', postEmployeeToRestaurant);
router.post('/login', login);

export default router;