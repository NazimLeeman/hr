import { Router } from "express";
import { getAllApplicant, getAllEmployeeOfRestaurant, login, postApplicantToEmployee, postEmployeeToRestaurant } from "../controllers/employee.controller";
const router = Router();

router.get('/restaurant/:id', getAllEmployeeOfRestaurant);
router.get('/all', getAllApplicant);
// router.post('/restaurant/:id', postEmployeeToRestaurant);
router.post('/:id/restaurant/:applicantId', postApplicantToEmployee);

router.post('/signup', postEmployeeToRestaurant);
router.post('/login', login);
router.put('/:id')

export default router;