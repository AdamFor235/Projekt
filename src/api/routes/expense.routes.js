import express from "express";

import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesSuma,
  getExpensesCategorySuma,
  getMonthlyExpenses
} from "../akcje/expense.akcje.js";

const router = express.Router();

router.get("/monthly", getMonthlyExpenses);

router.get("/suma", getExpensesSuma);

router.get("/suma/category", getExpensesCategorySuma);

router.get("/", getAllExpenses);

router.get("/:id", getExpenseById);

router.post("/", createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);


export default router;