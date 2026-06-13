import express from "express";
import cors from "cors";

import expenseRoutes from "./api/routes/expense.routes.js";
import exchangeRoutes from "./api/routes/exchange.routes.js";
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
app.use("/exchange-rate", exchangeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "App działa" });
});



app.use((err, req, res, next) => {
  console.error("FULL ERROR:");
  console.error(err);
  console.error(err?.stack);

  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
});

export default app;