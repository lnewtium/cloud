import express from "express";

import corsMiddleware from "@/middlewares/cors.middleware";
import fs from "fs";
import path from "node:path";
import fileUpload from "express-fileupload";
import config from "config";
import authRouter from "@/routes/auth.routes";
import fileRouter from "@/routes/file.routes";

const app = express();
const PORT = config.serverPort;

app.use(fileUpload({ createParentPath: true }));
app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

if (!fs.existsSync(path.join(process.cwd(), config.filePath))) {
  fs.mkdirSync(path.join(process.cwd(), config.filePath), { recursive: true });
}

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};
start();
