import { Router } from "express";
import { postPositionAccess, getAllChefsFromRestaurant, getAllWaitersFromRestaurant, getAllPositionsFromRestaurant, checkPositionAccess } from "../controllers/position.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get('/:id/restaurant/', getAllPositionsFromRestaurant);
router.post('/new', authMiddleware, postPositionAccess);
router.post('/check', checkPositionAccess);
router.get('/:restaurantId/chefs', getAllChefsFromRestaurant);
router.get('/:restaurantId/waiters', getAllWaitersFromRestaurant);


export default router;
