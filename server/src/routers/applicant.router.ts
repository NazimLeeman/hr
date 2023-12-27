import { Router } from "express";
import { postApplicant, searchApplicant, getAllApplicant, login } from "../controllers/applicant.controller";
const router = Router();

router.post('/signup', postApplicant);
router.post('/login', login);
router.get('/search', searchApplicant);
router.get('/all', getAllApplicant);

export default router;