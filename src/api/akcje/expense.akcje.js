import { Expense, Category } from "../../models/index.js";

export const getAllExpenses = async (req, res) => {
  try {

    const expenses = await Expense.findAll({
      include: Category
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
      include: Category
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

    const expense = await Expense.create(req.body);

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

    await expense.update(req.body);

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