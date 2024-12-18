"use client";
import React, { use, useState } from "react";
import axios from "axios";
function Page() {
  const [courseTitle, setcourseTitle] = useState("");
  const [courseDescription, setStoreDetails] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const handleStoreCreation = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const reponse: any = await axios.post(
      //todo - fix any type
      "http://localhost:3000/api/v1/teacher/createcourse",
      {
        courseTitle: courseTitle,
        courseDescription: courseDescription,
        price: price,
        teacherName: teacherName,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMessage(reponse.data.message);
    console.log(reponse);
  };
  return (
    <div>
      <form onSubmit={handleStoreCreation}>
        <label htmlFor="courseTitle">
          {" "}
          Enter Course Title
          <input
            id="courseTitle"
            placeholder="Enter Course Title"
            onChange={(e) => setcourseTitle(e.target.value)}
          ></input>
        </label>
        <label htmlFor="courseDescription">
          {" "}
          Enter Course Details
          <input
            id="Details"
            onChange={(e) => setStoreDetails(e.target.value)}
          ></input>
        </label>{" "}
        <label htmlFor="teacherName">
          {" "}
          Enter Teacher Name
          <input
            id="teacherName"
            onChange={(e) => setTeacherName(e.target.value)}
          ></input>
        </label>
        <label htmlFor="price">
          {" "}
          Enter Price for this course
          <input id="price" onChange={(e) => setPrice(e.target.value)}></input>
        </label>
        <button type="submit" className="bg-red-500">
          Create Course
        </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default Page;
