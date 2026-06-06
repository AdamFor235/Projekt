import express from "express";
import cors from "cors";

import expenseRoutes from "./api/routes/expense.routes.js";
import categoryRoutes from "./api/routes/category.routes.js";
import budgetRoutes from "./api/routes/budget.routes.js";
import dashboardRoutes from "./api/routes/dashboard.routes.js";
const app = express();

app.use(cors());
app.use(express.json());


app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);
app.use("/budgets",budgetRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({ message: "App działa" });
});

export default app;