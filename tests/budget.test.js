import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/database.js";
import initDb from "./setup.js";

describe("Budget API", () => {

  beforeAll(async () => {
      await initDb();
  });

  it("GET /budget/:month/status ma zwrucić status", async () => {
    const res = await request(app).get("/budgets/2026-06/status");

    expect(res.statusCode).toBe(200);

    expect(res.body).toHaveProperty("pln");
    expect(res.body).toHaveProperty("eur");
    expect(res.body).toHaveProperty("usd");
  });

  it("ma podać 404 jeśli nie istnieje budrzet", async () => {
    const res = await request(app).get("/budget/1900-01/status");

    expect(res.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await sequelize.close();
});