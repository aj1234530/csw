"use client";
import { useEffect, useState } from "react";
import CourseCard from "../components/courseCard/courseCard";
import axios from "axios";
function page() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //title ,description, price,  by(teachername)
  useEffect(() => {
    console.log("");
    const fetchData = async () => {
      //putting any for now
      const response: any = await axios.get(
        "http://localhost:3000/api/v1/student/courses"
      );
      console.log(response);
      setCourses(response.data.courses);
    };
    fetchData();
  }, []);
  return (
    <div>
      <CourseCard courses={courses} />
    </div>
  );
}

export default page;

//can we directly fetch the data from the server without making it client componet
//do fetching makes the component client
//want to show the the card
// 1. as many courses as available
// 2. as
