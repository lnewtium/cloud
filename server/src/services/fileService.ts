import fs from "fs";
import config from "config";
import { FileSchema } from "@prisma/client";

class FileService {
  createDir(file: FileSchema) {
    const filePath = `${config.filePath}/${file.userId}/${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: "File was created" });
        } else {
          return reject({ message: "File already exist" });
        }
      } catch (e) {
        return reject({ message: "File error" });
      }
    });
  }

  deleteFile(file: FileSchema) {
    const path = this.getPath(file);
    if (file.type === "Folder") {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }

  getPath(file: FileSchema) {
    return config.filePath + "/" + file.userId + "/" + file.path;
  }
}

export default new FileService();
