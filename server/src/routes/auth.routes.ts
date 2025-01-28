import express, { Router } from "express";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import authMiddleware, {
  AuthorizedRequest,
} from "@/middlewares/auth.middleware";
import fileService from "../services/fileService";
import { prisma } from "@/db";

const router = Router();

router.post(
  "/registration",
  [
    check("email", "Incorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12",
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req: express.Request, res: express.Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect request", errors });
      }
      const { email, password }: { email: string; password: string } = req.body;
      const candidate = await prisma.userSchema.findUnique({
        where: { email },
        select: { id: true },
      });
      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` });
      }
      const hashPassword = await bcrypt.hash(password, 8);
      const user = await prisma.userSchema.create({
        data: {
          email,
          password: hashPassword,
        },
      });
      await fileService.createDir({
        userId: user.id,
        name: "",
        type: "Folder",
        path: "",
        date: new Date(Date.now()),
        accessLink: null,
        size: BigInt(0),
        parentId: null,
        id: 0,
      });
      const token = jwt.sign({ id: user.id }, config.secretKey, {
        expiresIn: "24h",
      });
      res.json({ message: "User was created", token: token });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error" });
    }
  },
);

router.post("/login", async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.userSchema.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPassValid = bcrypt.compareSync(password, user.password);
    if (!isPassValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, config.secretKey, {
      expiresIn: "24h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: Number(user.diskSpace),
        usedSpace: Number(user.usedSpace),
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error" });
  }
});

router.get(
  "/auth",
  authMiddleware,
  async (req: AuthorizedRequest, res: express.Response) => {
    try {
      const user = await prisma.userSchema.findUnique({
        where: { id: req.user?.id },
      });
      if (!user) {
        return res.status(403).send({ message: "User not found" });
      }
      const token = jwt.sign({ id: user.id }, config.secretKey, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          diskSpace: Number(user.diskSpace),
          usedSpace: Number(user.usedSpace),
        },
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server error" });
    }
  },
);

export default router;
