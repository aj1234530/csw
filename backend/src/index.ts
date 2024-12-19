import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cors from "cors";
dotenv.config();
import { teacherRouter } from "./routes/teacherRoutes";
import { studentRouter } from "./routes/studentRoutes";
import { authRouter } from "./routes/authRoutes";
const PORT = process.env.PORT || 5000;
export const JWT_SECRET = process.env.JWT_SECRET; //TODO - what will be the fall back value here
console.log(PORT);

const app = express();
app.use(express.json());
app.use(cors());
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/auth", authRouter);
app.use((req, res, next) => {
  res.status(404).json({ error: "page not found" });
});
//writing on boarding routes

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

//many to one relationship is ... retry to add the couse getting purchaed to that fiedl
