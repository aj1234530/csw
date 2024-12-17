import express, { Request, Response } from "express";
import { authSessionMiddleware } from "../middlewares/authsession";
import { PrismaClient } from "@prisma/client";
import { bankServer } from "../webhook/bankSimulation";
const prisma = new PrismaClient();
export const studentRouter = express.Router();

studentRouter.get("/courses", async (req, res) => {
  //can apply the pagination here(not applied for now)
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json({ courses: courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
});
studentRouter.get(
  "/coursedetails/:courseId",
  async (req: Request, res: Response) => {
    //unautheticated
    const courseId = req.params.courseId;
    if (!courseId) {
      res.status(404).json({ message: "please enter course id" });
      return;
    }
    try {
      const course = await prisma.course.findFirst({ where: { id: courseId } });
      res.status(200).json({ message: course }); //responding with the course info
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  }
);

studentRouter.post(
  "/course/buy/:courseid",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const courseId = req.params.courseid;
      const userId = req.userId;
      if (!courseId) {
        res.status(409).json({ message: "please provide  a course id" });
        return;
      }
      const course = await prisma.course.findFirst({ where: { id: courseId } });
      if (!course) {
        res.status(409).json({ message: "requested resource does not exists" });
        return;
      }
      //call the webhook fxn with this much price
      const confirmation = bankServer(course.price); //passing the course actual price can't be send by the frontend
      if (!confirmation) {
        res.status(409).json({ message: "payment failed" });
        return;
      }
      //payment confirmation from the payment server - as soon as clicks the buy button - , redirected to the razorpay - the razor takes payment and send confirmation
      //razor pay accepts only if the pricing is equal to the actual cource price ()

      ////adding purchased course to the the purschaseCouses columna, (added an array witht the details in an object)many to one relationship is ... retry to add the couse getting purchaed to that fiedl
      console.log(userId, "inside");
      await prisma.user.update({
        where: { id: userId },
        data: {
          purschasedCourses: {
            connect: [
              {
                id: course.id,
                title: course.title,
                description: course.description,
                teachersName: course.teachersName,
                ownerId: course.ownerId,
                price: course.price,
              },
            ],
          },
        },
      });
      res.status(200).json({ message: "Course purchased success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal error" });
    }
  }
);

//all courses a student subs to ...
studentRouter.get(
  "/myzone",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        select: { purschasedCourses: true },
      });
      if (!user) {
        throw new Error("internal error");
      }
      res.status(200).json({ message: user.purschasedCourses }); //responding with all the purchased courses
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

studentRouter.get("/accesscourse/:id/", (req, res) => {});
