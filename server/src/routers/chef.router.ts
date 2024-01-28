import { Router } from "express";
import { getAllChefs, postChefEfficiency, getChefEfficiency } from '../controllers/chef.controller';

const router = Router();

router.get('/active/:restaurantId', getAllChefs);
router.post('/efficiency', postChefEfficiency);
router.get('/:id/efficiency', getChefEfficiency);

export default router;
