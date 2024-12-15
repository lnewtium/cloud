import fileService from "../services/fileService";
import config from "config";
import fs from "fs";
import { prisma } from "@/db";
import { AuthorizedRequest } from "@/middlewares/auth.middleware";
import express from "express";
import { z } from "zod";

class FileController {
  async createDir(req: AuthorizedRequest, res: express.Response) {
    try {
      const { name, parent }: { name: string; parent: number } = req.body;
      let updateParent: () => Promise<void> = async () => {};
      let data: Parameters<typeof prisma.fileSchema.create>[0]["data"] = {
        name,
        type: "Folder",
        parentId: parent,
        userId: z.number().parse(req.user?.id),
      };
      if (parent) {
        const parentFile = await prisma.fileSchema.findUnique({
          where: {
            id: parent,
          },
          include: {
            children: true,
          },
        });
        if (!parentFile) {
          return res.status(400).json({ message: "Parent not found" });
        }
        data = { ...data, path: `${parentFile.path}/${name}` };
        if (parentFile.parentId && Array.isArray(parentFile.children)) {
          // Update parent after folder creation
          updateParent = async () => {
            await prisma.fileSchema.update({
              where: {
                id: parentFile.id,
              },
              data: {
                children: {
                  connect: {
                    id: parentFile.id,
                  },
                },
              },
            });
          };
        }
      } else {
        data = { ...data, path: name };
      }
      const file = await prisma.fileSchema.create({ data: data });
      await fileService.createDir(file);
      await updateParent();
      return res.json({ ...file, size: Number(file.size) });
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req: AuthorizedRequest, res: express.Response) {
    try {
      const { sort } = req.query;
      let orderBy: any;
      switch (sort) {
        case "name":
          orderBy = { name: "asc" };
          break;
        case "type":
          orderBy = { type: "asc" };
          break;
        case "date":
          orderBy = { date: "asc" };
          break;
        default:
          orderBy = {};
          break;
      }
      const files = await prisma.fileSchema.findMany({
        where: {
          userId: req.user?.id,
          parentId: Number(req.query.parent),
        },
        orderBy: orderBy,
      });
      return res.json(
        files.map((file) => ({ ...file, size: Number(file.size) })),
      );
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get files" });
    }
  }

  async uploadFile(req: AuthorizedRequest, res: express.Response) {
    try {
      const file = req.files?.file;

      if (!file || Array.isArray(file)) {
        return res.status(400).send({ message: "Request is bad" });
      }
      let parent: Awaited<ReturnType<typeof prisma.fileSchema.findUnique>> =
        null;
      if (req.body.parent) {
        parent = await prisma.fileSchema.findUnique({
          where: {
            id: Number(req.body.parent),
            userId: req.user?.id,
          },
        });
      }

      const user = await prisma.userSchema.findUnique({
        where: {
          id: req.user?.id,
        },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (user.usedSpace + BigInt(file.size) > user.diskSpace) {
        return res.status(400).json({ message: "There no space on the disk" });
      }

      await prisma.userSchema.update({
        where: {
          id: user.id,
        },
        data: {
          usedSpace: user.usedSpace + BigInt(file.size),
        },
      });

      let path;
      if (parent) {
        path = `${process.cwd()}/${config.filePath}/${user.id}/${parent.path}/${file.name}`;
      } else {
        path = `${process.cwd()}/${config.filePath}/${user.id}/${file.name}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "File already exist" });
      }

      await file.mv(path);

      const type = file.name.split(".").pop();
      let filePath = file.name;
      if (parent) {
        filePath = parent.path + "/" + file.name;
      }
      const dbFile = await prisma.fileSchema.create({
        data: {
          name: file.name,
          type: type ?? "",
          size: BigInt(file.size),
          path: filePath,
          parentId: parent?.id,
          userId: user.id,
        },
      });

      res.json({ ...dbFile, size: Number(dbFile.size) });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Upload error" });
    }
  }

  async downloadFile(req: AuthorizedRequest, res: express.Response) {
    try {
      const file = await prisma.fileSchema.findUnique({
        where: {
          id: Number(req.query.id),
          userId: req.user?.id,
        },
      });
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      const path = fileService.getPath(file);
      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(400).json({ message: "Download error" });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Download error" });
    }
  }

  async deleteFile(req: AuthorizedRequest, res: express.Response) {
    try {
      const file = await prisma.fileSchema.findUnique({
        where: {
          id: Number(req.query.id),
          userId: req.user?.id,
        },
      });
      if (!file) {
        return res.status(400).json({ message: "Object not found" });
      }
      if (file.type === "Folder" && !fileService.checkForEmptyDir(file)) {
        return res.status(400).json({ message: "Folder not empty" });
      }
      fileService.deleteFile(file);
      await prisma.fileSchema.delete({
        where: {
          id: file.id,
        },
      });
      return res.json({
        message: `${file.type === "Folder" ? "Folder" : "File"} was deleted`,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async searchFile(req: AuthorizedRequest, res: express.Response) {
    try {
      const validator = z.string();
      const searchName = req.query.search;
      const userWithFiles = await prisma.userSchema.findUnique({
        where: {
          id: req.user?.id,
        },
        select: {
          files: true,
        },
      });
      const files = userWithFiles?.files
        .filter((file) => file.name.includes(validator.parse(searchName)))
        .map((file) => ({ ...file, size: Number(file.size) }));
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Search error" });
    }
  }
}

export default new FileController();
