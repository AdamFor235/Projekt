import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Budget = sequelize.define("Budget", {
  month: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  limit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: "budgets",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});

export default Budget;