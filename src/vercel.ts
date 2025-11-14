import serverless from "serverless-http";
import app from "./app";

const serverlessHandler = serverless(app);

export default async function handler(req: any, res: any) {
  return serverlessHandler(req, res);
}
