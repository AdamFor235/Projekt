import Expense from "./Expense.js";
import Category from "./category.js";
import Budget from "./Budget.js";


Category.hasMany(Expense, {
  foreignKey: "categoryId"
});

Expense.belongsTo(Category, {
  foreignKey: "categoryId"
});


export {
  Expense,
  Category,
  Budget
};