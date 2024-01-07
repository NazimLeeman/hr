import { Router } from "express";
import { postJob, getAllJob, searchJob, getAllJobForRestaurant } from "../controllers/job.controller";
const router = Router();

router.get('/all', getAllJob);
router.post('/new/:restaurantId', postJob);
router.get('/:restaurantId', getAllJobForRestaurant);
router.get('/search', searchJob);
 
export default router;