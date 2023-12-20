import { Router } from "express";
import { getAllApplicant, getAllEmployeeOfRestaurant, postApplicantToEmployee, postEmployeeToRestaurant } from "../controllers/employee.controller";
const router = Router();

router.get('/restaurant/:id', getAllEmployeeOfRestaurant);
router.get('/all', getAllApplicant);
router.post('/restaurant/:id', postEmployeeToRestaurant);
router.post('/:id/restaurant/:applicantId', postApplicantToEmployee);
// router.get('/*', (_, res) => {
//     res.status(404).send('Requested resource not found\n');
//   });


export default router;