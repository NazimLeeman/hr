import { Router } from "express";
import {  postWaiterEfficiency } from '../controllers/waiter.controller';

const router = Router();

router.post('/efficiency', postWaiterEfficiency);

export default router;
