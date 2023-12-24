import { Router } from "express";
import { postApplicant, searchApplicant } from "../controllers/applicant.controller";
const router = Router();

router.post('/new', postApplicant);
router.get('/search', searchApplicant);

export default router;