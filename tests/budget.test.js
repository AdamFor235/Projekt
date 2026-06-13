import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/database.js";
import initDb from "./setup.js";
import { Budget } from "../src/models/index.js";

describe("Budget API", () => {
  
  beforeAll(async () => {
      await initDb();
      await Budget.create({
        month: "2026-06",
        limit: 1000
      });
  });

  it("GET /budget/:month/status ma zwrucić status", async () => {
    const res = await request(app).get("/budgets/2026-06/status");

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("pln");
    expect(res.body).toHaveProperty("eur");
    expect(res.body).toHaveProperty("usd");
  });

  it("ma podać 404 jeśli nie istnieje budrzet", async () => {
    const res = await request(app).get("/budgets/1900-01/status");

    expect(res.statusCode).toBe(404);
  });

  it("zwraca 404 dla złego miesiąca", async () => {
  const res = await request(app)
    .get("/budgets/1999-01/status");

  expect(res.statusCode).toBe(404);
  });

  it("odrzuca pusty request POST budget", async () => {
  const res = await request(app)
    .post("/budgets")
    .send({});

  expect([400, 404]).toContain(res.statusCode);
  });

  it("budget zły limit", async () => {
  const res = await request(app)
    .post("/budgets")
    .send({ month: "2026-06", limit: -100 });

  expect(res.statusCode).toBe(400);
  });

});

afterAll(async () => {
  await sequelize.close();
});