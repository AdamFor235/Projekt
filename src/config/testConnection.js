import sequelize from "./database.js";

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Połączone z bazą");
  } catch (error) {
    console.error(error);
  }
};

export default testConnection;