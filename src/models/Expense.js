import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Expense = sequelize.define("Expense", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  description: {
    type: DataTypes.STRING
  },

  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  categoryId: {
  type: DataTypes.INTEGER,
  allowNull: true
}
});

export default Expense;