import app from "./app.js";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import "./models/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const waitForDb = async (retries = 10) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("db połączone");
      return;
    } catch (err) {
      console.log(`DB not ready, retry ${i + 1}/${retries}`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  throw new Error("DB not ready after retries");
};

const startServer = async () => {
  try {
    await waitForDb();

    await sequelize.sync();

    console.log(Object.keys(sequelize.models));
    console.log("Modele uruchomione");

    app.listen(PORT, () => {
      console.log(`Server na port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();