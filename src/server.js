import app from "./app.js";
import dotenv from "dotenv";

import sequelize from "./config/database.js";
import "./models/index.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("db połączone");

    await sequelize.sync();

    console.log("Modele uruchomione");

    app.listen(PORT, () => {
      console.log(`Server na port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
};

startServer();