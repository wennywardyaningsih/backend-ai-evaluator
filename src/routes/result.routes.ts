import { Router } from "express";
import ResultController from "../controllers/result.controller";

const router = Router();
router.get("/:id", ResultController.getResult);

export default router;
