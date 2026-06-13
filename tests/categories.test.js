import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/database.js";
import initDb from "./setup.js";

describe("Categories API", () => {

  beforeAll(async () => {
      await initDb();
  });
  
  it("GET /categories", async () => {
    const res = await request(app).get("/categories");

    expect(res.statusCode).toBe(200);
  });

  it("odrzuca pustą nazwę kategorii", async () => {
  const res = await request(app)
    .post("/categories")
    .send({ name: "" });

  expect(res.statusCode).toBe(400);
});

  it("POST /categories", async () => {
    const res = await request(app)
      .post("/categories")
      .send({ name: `TestCat_${Math.random()}` });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
  it("Odrzucił niewłaściwą expense", async () => {
  const res = await request(app)
    .post("/expenses")
    .send({
      amount: -100,
      date: "invalid",
      categoryId: 9999
    });
  
    expect(res.statusCode).toBe(400);
  });
  it("odrzuca null name", async () => {
  const res = await request(app)
    .post("/categories")
    .send({ name: null });

  expect(res.statusCode).toBe(400);
  });

  it("odrzuca bardzo długą nazwę", async () => {
  const res = await request(app)
    .post("/categories")
    .send({ name: "a".repeat(300) });

  expect(res.statusCode).toBe(400);
  });

  it("update category not found", async () => {
  const res = await request(app)
    .put("/categories/99999")
    .send({ name: "test" });

  expect(res.statusCode).toBe(404);
  });
  
  it("duplikacja kategori", async () => {
  await request(app).post("/categories").send({ name: "Food" });

  const res = await request(app)
    .post("/categories")
    .send({ name: "Food" });

  expect(res.statusCode).toBe(400);
  });

});

afterAll(async () => {
  await sequelize.close();
});