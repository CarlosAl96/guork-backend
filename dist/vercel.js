"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const serverless_http_1 = __importDefault(require("serverless-http"));
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
const serverlessHandler = (0, serverless_http_1.default)(app_1.default);
let sequelizeReady = null;
const ensureDbConnection = () => {
    if (!sequelizeReady) {
        sequelizeReady = database_1.default.authenticate().catch((error) => {
            console.error("❌ Unable to connect to database:", error);
            sequelizeReady = null;
            throw error;
        });
    }
    return sequelizeReady;
};
async function handler(req, res) {
    await ensureDbConnection();
    return serverlessHandler(req, res);
}
