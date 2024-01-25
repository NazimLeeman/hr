import { Router } from "express";
import { getAllChefs, postChefEfficiency } from '../controllers/chef.controller';

const router = Router();

router.get('/active/:restaurantId', getAllChefs);
router.post('/efficiency', postChefEfficiency);

export default router;
