import { Router } from "express";
import { postApplicant } from "../controllers/applicant.controller";
const router = Router();

router.post('/new', postApplicant);

export default router;