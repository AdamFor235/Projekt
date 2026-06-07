import { Router } from "express";
import { getDashboard } from "../akcje/dashboard.akcje.js";

const router = Router();

router.get("/:month", getDashboard);

export default router;