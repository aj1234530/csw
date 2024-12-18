"use client";
import React, { useState } from "react";
import axios from "axios";
function BuyButton({ courseId }: { courseId: string }) {
  const [message, setMessage] = useState(null);

  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const response: any = await axios.post(
      //fix any type here
      `http://localhost:3000/api/v1/student/course/buy/${courseId}`,
      {
        // agaar body me kuchh nhi bhej rhe ho to empty , this ate my 1 hr
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMessage(response.data.message);
  };
  return (
    <>
      <button onClick={handleBuy} className="bg-red-500">
        Buy
      </button>
      {message && <p>{message}</p>}
    </>
  );
}

export default BuyButton;
//get the course id and put that in place of the :/courseid
//http://localhost:3000/api/v1/student/course/buy/cm4siz6ae00033g91twwxh1lk
