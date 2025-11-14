import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./config/swagger";
import usersRoutes from "./modules/users/usersRoutes";
import profilesRoutes from "./modules/profiles/profilesRoutes";
import authRoutes from "./modules/auth/authRoutes";
import requestsRoutes from "./modules/requests/requestsRoutes";
import assignmentsRoutes from "./modules/assignments/assignmentsRoutes";

dotenv.config({ quiet: true });

const app = express();
const API_NAME = process.env.API_NAME || "api";
const API_VERSION = process.env.API_VERSION || "v1";
const BASE_PATH = `/${API_NAME}/${API_VERSION}`;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use(`${BASE_PATH}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// API Routes
app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/users`, usersRoutes);
app.use(`${BASE_PATH}/profiles`, profilesRoutes);
app.use(`${BASE_PATH}/requests`, requestsRoutes);
app.use(`${BASE_PATH}/assignments`, assignmentsRoutes);

export default app;
