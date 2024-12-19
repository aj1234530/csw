import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "..";
import { signupSchema } from "../types/zodValidation";

export const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = signupSchema.parse(req.body);
    if (!username || !email || !password) {
      res.status(409).json({ message: "all field manadatory" });
      return;
    }
    // if (!(await prisma.user.findUnique({ where: { email } }))) {
    //   res.status(409).json({ message: "please login" });
    //   return;
    // }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username: username, email: email, password: hashedPassword },
    }); //creating acc in db
    const id = user.id;
    if (!JWT_SECRET) {
      throw new Error(`internal server error`);
    }
    const token = jwt.sign({ id: id }, JWT_SECRET, { expiresIn: "48h" });
    res
      .status(200)
      .json({ message: "your are now signued up with us", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

authRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await prisma.user.findFirst({ where: { email } });
    console.log(user);
    if (!user) {
      res
        .status(409)
        .json({ message: "you are not signed up , please sign up" });
      return;
    }
    if (!(await bcrypt.compare(password, user.password))) {
      res.status(409).json({ message: "wrong password" });
      return;
    }
    if (!JWT_SECRET) {
      throw new Error(`internal server error`);
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "48h" });
    res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});
