import request from "supertest";
import app from "../src/app.js";
import sequelize from "../src/config/database.js";

describe("Categories API", () => {

  it("GET /categories", async () => {
    const res = await request(app).get("/categories");

    expect(res.statusCode).toBe(200);
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

});

afterAll(async () => {
  await sequelize.close();
});