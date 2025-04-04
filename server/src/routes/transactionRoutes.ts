import { Router } from "express";
import { controllerApi } from "../controllers/controllerApi";

const router = Router();

router.get("/getData", controllerApi.getAll);
router.post("/saveData", controllerApi.saveData);

export default router;
