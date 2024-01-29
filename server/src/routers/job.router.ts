import { Router } from "express";
import { postJob, masterJob, deleteJobInfo, getAllJob, searchJob,getAllPartTimeJobs, getAllFullTimeJobs, getAllJobForRestaurant } from "../controllers/job.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.get('/all', getAllJob);
router.get('/allPartTime', getAllPartTimeJobs);
router.get('/allFullTime', getAllFullTimeJobs);
router.post('/new', authMiddleware, postJob);
router.delete('/delete/:jobId', deleteJobInfo);
router.get('/restaurant', authMiddleware, getAllJobForRestaurant);
router.get('/search/jobs', searchJob);
router.post('/new/master', masterJob)
 
export default router;