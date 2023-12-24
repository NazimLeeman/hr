import { Router } from "express";
import { checkServiceAccess, postServiceAccess } from "../controllers/serviceAccess.controller";
const router = Router();

router.post('/user/:id', postServiceAccess);
router.post('/check', checkServiceAccess)

export default router;