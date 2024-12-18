import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div>
      <ul>
        <div className="bg-red-300">
          <ul className="flex flex-row w-full justify-around">
            <Link href="/courses">Home</Link>
            <Link href="/teacher/createstore">CreateStore</Link>
            <Link href="/teacher/createcourse">CreateCourse</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
            <Link href="/myzone">My purchased Course</Link>
            <Link href="#">CreatedCourses</Link>
          </ul>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
