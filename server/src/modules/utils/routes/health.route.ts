import { Router } from "express";
import type { Router as RouterType } from "express";
import { healthController } from "../controller/health.controller";

const router: RouterType = Router();
router.get("/",healthController);

export default router;