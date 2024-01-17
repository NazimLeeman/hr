import { Router } from "express";
import { postJob, getAllJob, searchJob,getAllPartTimeJobs, getAllFullTimeJobs, getAllJobForRestaurant } from "../controllers/job.controller";
const router = Router();

router.get('/all', getAllJob);
router.get('/allPartTime', getAllPartTimeJobs);
router.get('/allFullTime', getAllFullTimeJobs);
router.post('/new/:restaurantId', postJob);
router.get('/:restaurantId', getAllJobForRestaurant);
router.get('/search', searchJob);
 
export default router;