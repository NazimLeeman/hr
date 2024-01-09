import { Router } from "express";
import { applyJob, getApplicantsForRestaurant } from "../controllers/jobApplicant.controller";
const router = Router();

router.post('/applyJob/:applicantId', applyJob);
router.get('/applicantTracking/:restaurantId', getApplicantsForRestaurant);
// router.get('/applicationTracking/:applicantId', getApplicationsForApplicant);

export default router;