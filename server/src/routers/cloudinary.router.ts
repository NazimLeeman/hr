import { Router } from "express";
import { uploadImage } from "../controllers/cloudinary.controller"; 
const router = Router();

router.post('/upload', uploadImage);

export default router;
