import { Router } from "express";
import { postJob, getAllJob } from "../controllers/job.controller";
const router = Router();

router.get('/all', getAllJob);
router.post('/new', postJob);
 
export default router;