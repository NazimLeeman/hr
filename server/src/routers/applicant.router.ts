import { Router } from "express";
import { getAllApplicant, postApplicant } from "../controllers/applicant.controller";
const router = Router();

router.get('/restaurant', getAllApplicant);
router.post('/restaurant', postApplicant);

export default router;