import { Expense, Budget } from "../../models/index.js";
import { fn, col, where } from "sequelize";

export const createBudget = async (req, res) => {
  try {

    const budget = await Budget.create(req.body);

    res.status(201).json(budget);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getBudgets = async (req, res) => {
  try {

    const budgets = await Budget.findAll();

    res.status(200).json(budgets);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getBudgetStatus = async (req, res) => {
  try {
    const { month } = req.params;

    const budget = await Budget.findOne({
      where: { month }
    });

    if (!budget) {
      return res.status(404).json({
        message: "Budget not found"
      });
    }

    const spentResult = await Expense.findOne({
      attributes: [[fn("SUM", col("amount")), "spent"]],
      where: where(fn("DATE_FORMAT", col("date"), "%Y-%m"), month)
    });

    const spent = Number(spentResult?.dataValues?.spent || 0);
    const limit = Number(budget.limit);

    const remaining = limit - spent;

    res.json({
      month,
      budgetLimit: limit,
      spent,
      remaining,
      status: spent > limit ? "Przekroczony" : "OK"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

