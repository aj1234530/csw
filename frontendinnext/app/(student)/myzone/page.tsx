"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "@/app/components/courseCard/CourseCard";
//show all the courses purchased by the user
function page() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchMyCourses = async () => {
      const token = localStorage.getItem("token");
      const response: any = await axios.get(
        //todo - fix any type
        "http://localhost:3000/api/v1/student/myzone",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(response.data.courses);
      console.log(response);
    };
    fetchMyCourses();
  }, []);

  return (
    <div>
      <CourseCard courses={courses} />
    </div>
  );
}

export default page;
