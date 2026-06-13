import axios from "axios";
import { jest } from "@jest/globals";
import initDb from "./setup.js";
import { getExchangeRate } from "../src/services/exchange.service.js";
import sequelize from "../src/config/database.js";

jest.mock("axios");

axios.get = jest.fn();
describe("Exchange Service", () => {
    beforeAll(async () => {
        await initDb();
      });
  it("zwraca kurs EUR i USD", async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/EUR/")) {
        return Promise.resolve({
          data: {
            rates: [{ mid: 4.50 }]
          }
        });
      }
      if (url.includes("/USD/")) {
        return Promise.resolve({
          data: {
            rates: [{ mid: 4.00 }]
          }
        });
      }
    });
    const result = await getExchangeRate();
    expect(result).toEqual([
      { currency: "EUR", rate: 4.50 },
      { currency: "USD", rate: 4.00 }
    ]);
  });

});


afterAll(async () => {
  await sequelize.close();
});