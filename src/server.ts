import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/database";

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 3000;
const API_NAME = process.env.API_NAME || "api";
const API_VERSION = process.env.API_VERSION || "v1";
const BASE_PATH = `/${API_NAME}/${API_VERSION}`;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
    console.log("⚠️  Server will start without database connection");
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(
      `📚 API Docs available at http://localhost:${PORT}${BASE_PATH}/docs`
    );
  });
};

startServer();
