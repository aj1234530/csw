import express, { Request, Response } from "express";
import { authSessionMiddleware } from "../middlewares/authsession";
import { PrismaClient } from "@prisma/client";
import { createStoreSchema } from "../types/zodValidation";
const prisma = new PrismaClient();

export const teacherRouter = express.Router();

teacherRouter.post(
  "/createcoursestore",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const id = req.userId;
      const { storeTitle, storeDetails, teacherName, teacherDetails } =
        createStoreSchema.parse(req.body);
      const user = await prisma.user.update({
        where: { id },
        data: { courseStoreExists: true },
      }); //find the user who is creating the store and making course exist true
      await prisma.teacherCourseStore.create({
        data: {
          storetitle: storeTitle,
          storedetails: storeDetails,
          teacherName: teacherName,
          teacherDetails: teacherDetails,
          storeId: id, //will referennce the user
        },
      });
      res.status(200).json({ message: "your course store was created" }); //
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error" });
    }
  }
);

teacherRouter.post(
  "/createcourse",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    //check if has the store ,//
    try {
      const id = req.userId;
      console.log(id);
      const {
        courseTitle,
        courseDescription,
        pricing,
        teacherName,
        ThumbnailUrl,
      } = req.body; //add zod validation here
      const user = await prisma.user.findFirst({ where: { id } });
      console.log(user?.courseStoreExists);
      if (!user?.courseStoreExists) {
        //check if courseStore is there for the user
        res
          .status(409)
          .json({ message: "You don't have store first create a store" });
        return;
      }
      const course = await prisma.course.create({
        data: {
          ownerId: id,
          title: courseTitle,
          description: courseDescription,
          price: pricing,
          teachersName: teacherName,
          Thumbnail: ThumbnailUrl,
        },
      }); //will create a course referencing the the ownerId that is a teacher
      res.status(200).json({ message: "your course is created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
);
//access all the courses created by him
//we can apply pagination here
teacherRouter.get(
  "/allcourses",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.userId; //userId is the store id
    try {
      const user = await prisma.user.findFirst({ where: { id: userId } }); //getting the user info
      if (!user?.courseStoreExists) {
        res.status(404).json({ message: "You don't have a course store yet" });
        return;
      }
      const store = await prisma.teacherCourseStore.findUnique({
        where: { storeId: userId },
        select: { courses: true },
      });
      res.status(200).json({ yourcourses: store?.courses });
    } catch (error) {}
  }
);

//access a course
teacherRouter.get(
  "/course/:id",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    const courseId = req.params.id;
    const userId = req.userId;
    const course = await prisma.teacherCourseStore.findUnique({
      where: { storeId: userId },
      select: { courses: true },
    });
    const requestedCourse = course?.courses.find(
      (course) => course.id == courseId
    );
    res.status(200).json({ course: requestedCourse });
  }
);

teacherRouter.patch("/course/:id", authSessionMiddleware, async (req, res) => {
  const userId = req.userId;
  const { courseTitle, courseDescription, price, teachersName } = req.body;
  const courseId = req.params.id;
  try {
    //find the course, check the owner if owner is right give permission to change the thing
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (course?.ownerId !== userId) {
      res
        .status(409)
        .json({ message: "this is not your course , you cannot edit it" });
      return;
    }
    await prisma.course.update({
      where: { id: courseId },
      data: {
        title: courseTitle || course.title,
        description: courseDescription || course.description,
        price: price || course.price,
        teachersName: teachersName || course.teachersName,
      }, //if nothing anything not sent fallback is previous value
    });
    res.status(200).json({ message: "course info updated" });
  } catch (error) {
    console.log(error);
  }
});
//update a course

//add resources to the course

//we have to make select true for courses if we want to access the courses
