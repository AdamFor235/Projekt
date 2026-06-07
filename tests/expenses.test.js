import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/database.js";
import initDb from "./setup.js";

describe("Expenses API", () => {

  beforeAll(async () => {
    await initDb();
  });

  it("GET /expenses Zwrócić tablice", async () => {
    const res = await request(app).get("/expenses");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /expenses Stworzył expense", async () => {

    const category = await request(app)
    .post("/categories")
    .send({ name: `Food` });

  const catId = category.body.id;
    const res = await request(app)
      .post("/expenses")
      .send({
        amount: 100,
        description: "test",
        date: "2026-06-01",
        categoryId: catId
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("DELETE /expenses/:id Usunoł expnese", async () => {
    const category = await request(app)
    .post("/categories")
    .send({ name: "TestCat" });

  const catId = category.body.id;

    const create = await request(app)
      .post("/expenses")
      .send({
        amount: 50,
        description: "to delete",
        date: "2026-06-01",
        categoryId: catId
      });

    const id = create.body.id;

    const res = await request(app).delete(`/expenses/${id}`);

    expect(res.statusCode).toBe(200);
  });

  
});


afterAll(async () => {
  await sequelize.close();
});