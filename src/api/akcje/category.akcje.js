import { Category } from "../../models/index.js";

export const getAllCategories = async (req, res) => {
  try {

    const categories = await Category.findAll();

    res.status(200).json(categories);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name jest wymagane"
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        message: "Category name musi mieć 2 znaki"
      });
    }

    if (name.length > 50) {
      return res.status(400).json({
        message: "Category name nie większe od 50"
      });
    }

    const existingCategory = await Category.findOne({
      where: { name }
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category istnieje"
      });
    }

    const category = await Category.create({
      name
    });

    res.status(201).json(category);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name jest wymagane"
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        message: "Category name musi mieć 2 znaki"
      });
    }

    if (name.length > 50) {
      return res.status(400).json({
        message: "Category name nie większe od 50"
      });
    }

    const existingCategory = await Category.findOne({
      where: { name }
    });

    if (
      existingCategory &&
      existingCategory.id !== category.id
    ) {
      return res.status(400).json({
        message: "Category istnieje"
      });
    }

    await category.update({
      name
    });

    res.status(200).json(category);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    await category.destroy();

    res.status(200).json({
      message: "Category deleted"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};