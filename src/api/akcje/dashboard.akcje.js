import { Expense, Budget, Category } from "../../models/index.js";

export const getDashboard = async (req, res) => {
  try {
    const { month } = req.params;

    const expenses = await Expense.findAll({
      include: Category
    });

    const monthExpenses = expenses.filter(e =>
      new Date(e.date).toISOString().slice(0, 7) === month
    );

    const totalExpenses = monthExpenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

    const budget = await Budget.findOne({
      where: { month }
    });

    const totalBudget = budget ? Number(budget.limit) : 0;

    const balance = totalBudget - totalExpenses;

    const categoryMap = {};

    monthExpenses.forEach(e => {
      const cat = e.Category?.name || "uncategorized";

      categoryMap[cat] = (categoryMap[cat] || 0) + Number(e.amount);
    });

    const topCategories = Object.entries(categoryMap).map(
      ([category, total]) => ({ category, total })
    );

    res.json({
      month,
      totalExpenses,
      totalBudget,
      balance,
      topCategories
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};