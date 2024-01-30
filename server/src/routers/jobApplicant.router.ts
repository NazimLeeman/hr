import { Router } from "express";
import { applyJob, getApplicantsForRestaurant, getApplicationsForApplicant, updateJobStatus } from "../controllers/jobApplicant.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post('/applyJob/:applicantId', applyJob);
router.get('/applicantTracking', authMiddleware, getApplicantsForRestaurant);
router.put('/:jobApplicantId', updateJobStatus);
router.get('/applicationTracking/:applicantId', getApplicationsForApplicant);

export default router;