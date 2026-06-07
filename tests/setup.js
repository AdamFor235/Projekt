import sequelize from "../src/config/database.js";

export default async () => {
  let retries = 20;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("DB gotowe na testy");
      return;
    } catch (e) {
      console.log("Czekanie na DB");
      await new Promise(r => setTimeout(r, 1000));
      retries--;
    }
  }
  throw new Error("DB nie jest gotowe");
};