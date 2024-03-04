import { Router } from "express";
import { deleteEmployee, getAllEmployeeOfRestaurant, getUserInfo, login, serviceAccess, CheckServiceAccess, postApplicantToEmployee, postEmployeeToRestaurant, searchEmployee, updateEmployee, postManyEmployeesToRestaurant } from "../controllers/employee.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get('/restaurant',authMiddleware, getAllEmployeeOfRestaurant);
// router.get('/:id/restaurant/:employeeId', searchEmployee);
router.post('/restaurant/:applicantId', authMiddleware, postApplicantToEmployee);
// router.post('/signup', postEmployeeToRestaurant);
router.post('/create',authMiddleware, postEmployeeToRestaurant);
// router.post('/signup/:restaurantId', createEmployeeForRestaurant);
router.put('/update/:employeeId', authMiddleware, updateEmployee);
router.delete('/delete/:employeeId', authMiddleware, deleteEmployee);
router.get('/search', authMiddleware, searchEmployee);
router.post('/login', login);
router.get('/access/service/:userId', serviceAccess);
router.get('/userInfo/:userId', getUserInfo);
router.post('/access/check', CheckServiceAccess);
router.post('/createmany', postManyEmployeesToRestaurant);

export default router;