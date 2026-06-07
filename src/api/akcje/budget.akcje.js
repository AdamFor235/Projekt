import { Expense, Budget } from "../../models/index.js";
import { fn, col, where } from "sequelize";
import axios from "axios";

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
    const [eurRes, usdRes] = await Promise.all([
      axios.get("https://api.nbp.pl/api/exchangerates/rates/A/EUR/?format=json"),
      axios.get("https://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json")
    ]);

    const eurRate = eurRes.data.rates[0].mid;
    const usdRate = usdRes.data.rates[0].mid;

    const response = {
      month,
      pln: {
        budgetLimit: limit,
        spent,
        remaining,
        status: spent > limit ? "Przekroczony" : "OK"
      },
      eur: {
        budgetLimit: +(limit / eurRate).toFixed(2),
        spent: +(spent / eurRate).toFixed(2),
        remaining: +(remaining / eurRate).toFixed(2)
      },
      usd: {
        budgetLimit: +(limit / usdRate).toFixed(2),
        spent: +(spent / usdRate).toFixed(2),
        remaining: +(remaining / usdRate).toFixed(2)
      }
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

