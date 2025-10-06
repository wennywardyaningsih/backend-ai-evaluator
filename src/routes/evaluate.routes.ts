import { Router } from "express";
import EvaluateController from "../controllers/evaluate.controller";

const router = Router();
router.post("/", EvaluateController.evaluateSync);

export default router;
