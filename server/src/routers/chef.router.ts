import { Router } from "express";
import { getAllChefs } from '../controllers/chef.controller';

const router = Router();

router.get('/active/:restaurantId', getAllChefs);
router.post('/efficiency');

export default router;
