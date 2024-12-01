import jwt from "jsonwebtoken";
import config from "config";
import express from "express";
import { z } from "zod";

const tokenValidator = z.object({ id: z.number() });

export type AuthorizedRequest = express.Request & { user?: { id: number } };

export default (
  req: AuthorizedRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    const decodedToken = jwt.verify(token, config.secretKey);
    req.user = tokenValidator.parse(decodedToken);
    next();
  } catch (e) {
    return res.status(401).json({ message: "Auth error" });
  }
};
