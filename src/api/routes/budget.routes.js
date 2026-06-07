import { Router } from "express";

import {
  createBudget,
  getBudgets,
  getBudgetStatus
} from "../akcje/budget.akcje.js";

const router = Router();

router.get("/", getBudgets);
router.post("/", createBudget);
router.get("/:month/status", getBudgetStatus);

export default router;