import fileService from "../services/fileService";
import config from "config";
import fs from "fs";
import { prisma } from "@/db";
import { v4 } from "uuid";
import { AuthorizedRequest } from "@/middleware/auth.middleware";
import express from "express";
import { z } from "zod";

class FileController {
  async createDir(req: AuthorizedRequest, res: express.Response) {
    try {
      const {
        name,
        type,
        parent
      }: { name: string; type: string; parent: number } = req.body;
      const fileCreateOperation = prisma.file.create({
        data: {
          name,
          type,
          parentId: parent,
          userId: z.number().parse(req.user?.id)
        }
      });
      const parentFile = await prisma.file.findUnique({
        where: {
          id: parent
        },
        include: {
          children: true
        }
      });
      const file = await fileCreateOperation;
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        await prisma.file.update({
          where: {
            id: file.id
          },
          data: {
            path: `${parentFile.path}/${file.name}`
          }
        })
        await fileService.createDir(file);
        if (parentFile.parentId && Array.isArray(parentFile.children)) {
          await prisma.file.update({
            where: {
              id: parentFile.id
            },
            data: {
              children: {
                connect: {
                  id: parentFile.id
                }
              }
            }
          });
        }
      }
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req: AuthorizedRequest, res: express.Response) {
    try {
      const { sort } = req.query;
      let files;
      switch (sort) {
        case "name":
          files = await File.find({
            user: req.user?.id,
            parent: req.query.parent
          }).sort({ name: 1 });
          break;
        case "type":
          files = await File.find({
            user: req.user?.id,
            parent: req.query.parent
          }).sort({ type: 1 });
          break;
        case "date":
          files = await File.find({
            user: req.user?.id,
            parent: req.query.parent
          }).sort({ date: 1 });
          break;
        default:
          files = await File.find({
            user: req.user?.id,
            parent: req.query.parent
          });
          break;
      }
      return res.json(files);
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

      const parent = await File.findOne({
        user: req.user?.id,
        _id: req.body.parent
      });
      const user = await User.findOne({ _id: req.user?.id });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({ message: "There no space on the disk" });
      }

      user.usedSpace = user.usedSpace + file.size;

      let path;
      if (parent) {
        path = `${process.cwd()}/${config.filePath}/${user._id}/${parent.path}/${file.name}`;
      } else {
        path = `${process.cwd()}/${config.filePath}/${user._id}/${file.name}`;
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
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent?._id,
        user: user._id
      });

      await dbFile.save();
      await user.save();

      res.json(dbFile);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Upload error" });
    }
  }

  async downloadFile(req: AuthorizedRequest, res: express.Response) {
    try {
      const file = await File.findOne({
        _id: req.query.id,
        user: req.user?.id
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
      const file = await File.findOne({
        _id: req.query.id,
        user: req.user?.id
      });
      if (!file) {
        return res.status(400).json({ message: "file not found" });
      }
      fileService.deleteFile(file);
      await file.deleteOne();
      return res.json({ message: "File was deleted" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Dir is not empty" });
    }
  }

  async searchFile(req: AuthorizedRequest, res: express.Response) {
    try {
      const validator = z.string();
      const searchName = req.query.search;
      if (!(searchName instanceof String)) {
        return res.status(400).json({ message: "Search name is required" });
      }
      let files = await File.find({ user: req.user?.id });
      files = files.filter((file) =>
        file.name.includes(validator.parse(searchName))
      );
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Search error" });
    }
  }

  async uploadAvatar(req: AuthorizedRequest, res: express.Response) {
    try {
      const file = req.files?.file;

      if (!file || Array.isArray(file)) {
        return res.status(400).send({ message: "Request is bad" });
      }
      const user = await User.findById(req.user?.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      const avatarName = v4() + ".jpg";
      await file.mv(config.staticPath + "/" + avatarName);
      user.avatar = avatarName;
      await user.save();
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Upload avatar error" });
    }
  }

  async deleteAvatar(req: AuthorizedRequest, res: express.Response) {
    try {
      const user = await User.findById(req.user?.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      fs.unlinkSync(config.staticPath + "/" + user.avatar);
      user.avatar = undefined;
      await user.save();
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Delete avatar error" });
    }
  }
}

export default new FileController();
