import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
console.log(PORT);

const app = express();

app.get("/ping", (req, res) => {
  res.send("pong");
});


app.listen(PORT, () => console.log(`server is running on ${PORT}`));
