import { Router } from "express";
import { getAllApplicant, postApplicant } from "../controllers/applicant.controller";
const router = Router();

router.get('/all', getAllApplicant);
router.post('/new', postApplicant);

export default router;