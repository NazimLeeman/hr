import { Router } from "express";
import { applyJob } from "../controllers/jobApplicant.controller";
const router = Router();

router.post('/applyJob/:applicantId', applyJob);

export default router;