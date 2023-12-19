import { Router } from "express";
import { getAllEmployeeOfRestaurant, postEmployeeToRestaurant } from "../controllers/employee.controller";
const router = Router();

router.get('/restaurant/:id', getAllEmployeeOfRestaurant);
router.post('/restaurant/:id', postEmployeeToRestaurant);
// router.get('/*', (_, res) => {
//     res.status(404).send('Requested resource not found\n');
//   });


export default router;