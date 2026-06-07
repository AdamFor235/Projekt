import User from "./User.js";
import Expense from "./Expense.js";
import Category from "./category.js";
import Budget from "./Budget.js";

User.hasMany(Expense, {
  foreignKey: "userId",
  onDelete: "CASCADE"
});

Expense.belongsTo(User, {
  foreignKey: "userId"
});

Category.hasMany(Expense, {
  foreignKey: "categoryId"
});

Expense.belongsTo(Category, {
  foreignKey: "categoryId"
});

export {
  User,
  Expense,
  Category,
  Budget
};