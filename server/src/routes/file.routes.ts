import Router from "express";
const router = Router();
import authMiddleware from "@/middlewares/auth.middleware";
import fileController from "@/controllers/fileController";

router.post("", authMiddleware, fileController.createDir);
router.post("/upload", authMiddleware, fileController.uploadFile);
router.get("", authMiddleware, fileController.getFiles);
router.get("/download", authMiddleware, fileController.downloadFile);
router.get("/search", authMiddleware, fileController.searchFile);
router.delete("/", authMiddleware, fileController.deleteFile);

export default router;
