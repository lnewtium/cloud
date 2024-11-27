import express from "express";

import fileUpload from "express-fileupload";
import config from "config";
import authRouter from "@/routes/auth.routes";
import fileRouter from "@/routes/file.routes";
const app = express();
const PORT = config.serverPort;
import corsMiddleware from "@/middleware/cors.middleware";

app.use(fileUpload({ createParentPath: true }));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static("static"));
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

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
