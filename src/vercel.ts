import serverless from "serverless-http";
import app from "./app";
import sequelize from "./config/database";

const serverlessHandler = serverless(app);

let sequelizeReady: Promise<void> | null = null;

const ensureDbConnection = () => {
	if (!sequelizeReady) {
		sequelizeReady = sequelize.authenticate().catch((error) => {
			console.error("❌ Unable to connect to database:", error);
			sequelizeReady = null;
			throw error;
		});
	}
	return sequelizeReady;
};

export default async function handler(req: any, res: any) {
	await ensureDbConnection();
	return serverlessHandler(req, res);
}
