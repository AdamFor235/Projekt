import { Expense, Category } from "../../models/index.js";
import { Op, fn, col } from "sequelize";
import moment from "moment";

export const getAllExpenses = async (req, res) => {
  try {

    const { categoryId, min, max, sort } = req.query;

    const where = {};
    

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (min) {
      where.amount = {
        ...where.amount,
        [Op.gte]: Number(min)
      };
    }

    if (max) {
      where.amount = {
        ...where.amount,
        [Op.lte]: Number(max)
      };
    }

    const expenses = await Expense.findAll({
      where,
      include: {
        model: Category
      },
      order: [
        ["amount", sort === "ASC" ? "ASC" : "DESC"]
      ]
    });

    res.status(200).json(expenses);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getExpenseById = async (req, res) => {
  try {

    const expense = await Expense.findByPk(req.params.id, {
      include: {
        model: Category
      }
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    res.status(200).json(expense);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { amount, description, date, categoryId } = req.body;

    // Walidacja
    if (amount === undefined || amount === null) {
      return res.status(400).json({
        message: "Amount jest wymagany"
      });
    }

    if (!date) {
      return res.status(400).json({
        message: "Data jest wymagana"
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount musi być pozytywny"
      });
    }

    if (description && description.length > 255) {
      return res.status(400).json({
        message: "opis nie większy niż 255"
      });
    }

    if (categoryId) {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(400).json({
          message: "kategoria nie istnieje"
        });
      }
    }

    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
      return res.status(400).json({
      message: "Invalid date format"
      });
    }
    

    const expense = await Expense.create({
      amount,
      description,
      date,
      categoryId
    });

    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    const { amount, description, date, categoryId } = req.body;

    if (amount !== undefined) {
      if (isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({
          message: "Amount musi być pozytywny"
        });
      }
    }

    if (description !== undefined && description.length > 255) {
      return res.status(400).json({
        message: "opis nie większy niż 255"
      });
    }

    if (categoryId !== undefined && categoryId !== null) {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        return res.status(400).json({
          message: "kategoria nie istnieje"
        });
      }
    }

    await expense.update({
      amount,
      description,
      date,
      categoryId
    });

    res.status(200).json(expense);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteExpense = async (req, res) => {
  try {

    const expense = await Expense.findByPk(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found"
      });
    }

    await expense.destroy();

    res.status(200).json({
      message: "Expense deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getExpensesSuma = async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    const total = expenses.reduce((sum, exp) => {
      return sum + Number(exp.amount);
    }, 0);

    res.status(200).json({
      total
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getExpensesCategorySuma = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      include: Category
    });

    const summary = {};

    expenses.forEach(exp => {
      const category = exp.Category?.name || "Uncategorized";

      if (!summary[category]) {
        summary[category] = 0;
      }

      summary[category] += Number(exp.amount);
    });

    res.status(200).json(summary);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getMonthlyExpenses = async (req, res) => {
  try {

    const monthly = await Expense.findAll({
      attributes: [
        [fn("DATE_FORMAT", col("date"), "%Y-%m"), "month"],
        [fn("SUM", col("amount")), "total"]
      ],
      group: [fn("DATE_FORMAT", col("date"), "%Y-%m")],
      order: [[fn("DATE_FORMAT", col("date"), "%Y-%m"), "ASC"]]
    });

    res.status(200).json(monthly);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};