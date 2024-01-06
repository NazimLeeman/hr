import { Router } from "express";
import { postPositionAccess, getAllPositionsFromRestaurant, checkPositionAccess } from "../controllers/position.controller";
const router = Router();

router.get('/:id/restaurant/', getAllPositionsFromRestaurant);
router.post('/:restaurantId', postPositionAccess);
router.post('/check', checkPositionAccess);


export default router;
