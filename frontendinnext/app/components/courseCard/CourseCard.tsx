import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import BuyButton from "./BuyButton";
//making component async
interface courses {
  id: string;
  Thumbnail: string;
  ownedId: string;
  price: number;
  teacherName: string;
  title: string;
  description: string;
}
//prop is array of courses with the details
//now map with the data
function CourseCard({ courses }: { courses: courses[] }) {
  return (
    <div>
      {courses.length > 0 ? (
        courses.map((course) => (
          <div key={course.id} className="card-container">
            <div>{course.title} </div>
            <div>{course.price}</div>
            <div>by {course.teacherName}</div>
            {/* passing courseId as prop to the buy button so that it can make the fetch request */}
            <BuyButton courseId={course.id} />
          </div>
        ))
      ) : (
        <div>No courses available</div>
      )}
    </div>
  );
}

export default CourseCard;
