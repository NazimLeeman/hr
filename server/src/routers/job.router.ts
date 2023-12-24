import { Router } from "express";
import { postJob, getAllJob, searchJob } from "../controllers/job.controller";
const router = Router();

router.get('/all', getAllJob);
router.post('/new', postJob);
router.get('/search', searchJob);
 
export default router;