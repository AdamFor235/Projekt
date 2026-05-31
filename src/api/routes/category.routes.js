import express from "express";

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../akcje/category.akcje.js";

const router = express.Router();

router.get("/", getAllCategories);

router.post("/", createCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;