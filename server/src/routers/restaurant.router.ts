import { Router } from "express";
import { createRestaurantOwner } from "../controllers/employee.controller";
const router = Router();


router.post('/new', createRestaurantOwner);


export default router;
