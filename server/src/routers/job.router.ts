import { Router } from "express";
import { postJob, deleteJobInfo, getAllJob, searchJob,getAllPartTimeJobs, getAllFullTimeJobs, getAllJobForRestaurant } from "../controllers/job.controller";
const router = Router();

router.get('/all', getAllJob);
router.get('/allPartTime', getAllPartTimeJobs);
router.get('/allFullTime', getAllFullTimeJobs);
router.post('/new/:restaurantId', postJob);
router.delete('/delete/:jobId', deleteJobInfo);
router.get('/:restaurantId', getAllJobForRestaurant);
router.get('/search/jobs', searchJob);
 
export default router;