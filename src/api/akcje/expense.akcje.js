import { Expense, Category } from "../../models/index.js";

export const getAllExpenses = async (req, res) => {
  try {

    const expenses = await Expense.findAll({
      include: {
        model: Category
      }
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