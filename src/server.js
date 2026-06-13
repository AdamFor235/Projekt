import app from "./app.js";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import "./models/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const waitForDb = async (retries = 30) => {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("DB connected");
      return;
    } catch (err) {
      console.log(`DB not ready, retry ${i + 1}/${retries}`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  throw new Error("DB not ready after retries");
};

const startServer = async () => {
  try {
    await waitForDb();

    await sequelize.sync();

    console.log("Models loaded:", Object.keys(sequelize.models));

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("DB error. Start:", error);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (no DB ready)`);
    });
  }
};

startServer();