"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config({ quiet: true });
const PORT = process.env.PORT || 3000;
const API_NAME = process.env.API_NAME || "api";
const API_VERSION = process.env.API_VERSION || "v1";
const BASE_PATH = `/${API_NAME}/${API_VERSION}`;
const startServer = async () => {
    try {
        await database_1.default.authenticate();
        console.log("✅ Database connected successfully");
    }
    catch (error) {
        console.error("❌ Unable to connect to database:", error);
        console.log("⚠️  Server will start without database connection");
    }
    app_1.default.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📚 API Docs available at http://localhost:${PORT}${BASE_PATH}/docs`);
    });
};
startServer();
