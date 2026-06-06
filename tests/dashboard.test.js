import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/database.js";

describe("Dashboard", () => {

  it("GET /dashboard/:month", async () => {
    const res = await request(app)
      .get("/dashboard/2026-06");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("totalExpenses");
    expect(res.body).toHaveProperty("balance");
  });

});

afterAll(async () => {
  await sequelize.close();
});