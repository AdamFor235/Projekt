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

  it("odrzuca pusty body POST /expenses", async () => {
  const res = await request(app).post("/expenses").send({});

  expect(res.statusCode).toBe(400);
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

  it("odrzuca brak amount", async () => {
  const res = await request(app)
    .post("/expenses")
    .send({date: "2026-01-01"});

  expect(res.statusCode).toBe(400);
  });

  it("zwraca 404 dla nieistniejącego id", async () => {
  const res = await request(app).delete("/expenses/999999");
  expect(res.statusCode).toBe(404);
  });
  it("odrzuca złą datę", async () => {
  const res = await request(app).post("/expenses").send({
    amount: 100,
    date: "xxx",
    categoryId: 1
  });
  expect(res.statusCode).toBe(400);
  });

  it("odrzuca brak kategorii gdy ID nie istnieje", async () => {
  const res = await request(app).post("/expenses").send({
    amount: 100,
    date: "2026-06-01",
    categoryId: 999999
  });

  expect(res.statusCode).toBe(400);
  });

  it("updateExpense -zle amount", async () => {
  const res = await request(app)
    .put("/expenses/1")
    .send({ amount: -10 });

  expect([400, 404]).toContain(res.statusCode);
  });

  it("updateExpense - not found", async () => {
  const res = await request(app)
    .put("/expenses/999999")
    .send({ amount: 100 });

  expect(res.statusCode).toBe(404);
  });

  it("GET /expenses z filtrem", async () => {
  const res = await request(app)
    .get("/expenses?min=10&max=100&sort=ASC");

  expect(res.statusCode).toBe(200);
  });

  

});


afterAll(async () => {
  await sequelize.close();
});