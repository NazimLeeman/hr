import { Router } from "express";
import { deleteEmployee, getAllEmployeeOfRestaurant, getUserInfo, login, serviceAccess, CheckServiceAccess, postApplicantToEmployee, postEmployeeToRestaurant, searchEmployee, updateEmployee } from "../controllers/employee.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get('/restaurant',authMiddleware, getAllEmployeeOfRestaurant);
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
router.get('/userInfo/:userId', getUserInfo);
router.post('/access/check', CheckServiceAccess);

export default router;