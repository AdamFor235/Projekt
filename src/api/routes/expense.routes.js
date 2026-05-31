import express from "express";

import {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
  getExpensesSuma,
  getExpensesCategorySuma
} from "../akcje/expense.akcje.js";

const router = express.Router();

router.get("/summary", getExpensesSuma);

router.get("/summary/categories", getExpensesCategorySuma);

router.get("/", getAllExpenses);

router.get("/:id", getExpenseById);

router.post("/", createExpense);

router.put("/:id", updateExpense);

router.delete("/:id", deleteExpense);


export default router;