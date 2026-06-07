import { Expense, Budget, Category } from "../../models/index.js";
import axios from "axios";

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
    const [eurRes, usdRes] = await Promise.all([
      axios.get("https://api.nbp.pl/api/exchangerates/rates/A/EUR/?format=json"),
      axios.get("https://api.nbp.pl/api/exchangerates/rates/A/USD/?format=json")
    ]);
    const eur = eurRes.data.rates[0].mid;
    const usd = usdRes.data.rates[0].mid;
    res.json({
      month,
      totalExpenses,
      totalBudget,
      balance,
      topCategories,

      pln: {
        totalExpenses,
        totalBudget,
        balance
      },
      eur: {
        totalExpenses: +(totalExpenses / eur).toFixed(2),
        totalBudget: +(totalBudget / eur).toFixed(2),
        balance: +(balance / eur).toFixed(2)
      },
      usd: {
        totalExpenses: +(totalExpenses / usd).toFixed(2),
        totalBudget: +(totalBudget / usd).toFixed(2),
        balance: +(balance / usd).toFixed(2)
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};