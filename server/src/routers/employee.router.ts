import { Router } from "express";
import { deleteEmployee, getAllEmployeeOfRestaurant,  login, serviceAccess, postApplicantToEmployee, postEmployeeToRestaurant, searchEmployee, updateEmployee } from "../controllers/employee.controller";
const router = Router();

router.get('/restaurant/:id', getAllEmployeeOfRestaurant);
// router.get('/:id/restaurant/:employeeId', searchEmployee);
router.post('/:id/restaurant/:applicantId', postApplicantToEmployee);
// router.post('/signup', postEmployeeToRestaurant);
router.post('/create/:restaurantId', postEmployeeToRestaurant);
// router.post('/signup/:restaurantId', createEmployeeForRestaurant);
router.put('/update/:restaurantId/:employeeId', updateEmployee);
router.delete('/delete/:restaurantId/:employeeId', deleteEmployee);
router.get('/:restaurantId/search', searchEmployee);
router.post('/login', login);
router.get('/access/service/:userId', serviceAccess);

export default router;