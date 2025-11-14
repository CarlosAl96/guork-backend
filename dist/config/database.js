"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = require("../models");
dotenv_1.default.config({ quiet: true });
const sequelize = new sequelize_typescript_1.Sequelize(process.env.DATABASE_URL || "", {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
    models: models_1.models,
});
exports.default = sequelize;
