import { Router } from "express";
import { createRestaurantOwner, createRestaurantOwners } from "../controllers/employee.controller";
const router = Router();

router.post('/new', createRestaurantOwner);
router.post('/newOwners', createRestaurantOwners);

export default router;
