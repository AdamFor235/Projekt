import express from "express";
import cors from "cors";
import expenseRoutes from "./api/routes/expense.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.json({ message: "App działa" });
});

export default app;