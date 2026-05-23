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

    const category = await Category.create(req.body);

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

    await category.update(req.body);

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