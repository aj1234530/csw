"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  const [storeTitle, setStoreTitle] = useState("");
  const [storeDetails, setStoreDetails] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherDetails, setTeacherDetails] = useState("");
  const [message, setMessage] = useState("");
  //conditional redirecting and redereding of ui based on the message type

  const handleStoreCreation = async (e: any) => {
    //TODO - fix the type here
    e.preventDefault();
    const token = localStorage.getItem("token");
    //post request to the the axios
    const reponse: any = await axios.post(
      //todo - fix any type
      "http://localhost:3000/api/v1/teacher/createcoursestore",
      {
        storeTitle: storeTitle,
        storeDetails: storeDetails,
        teacherName: teacherName,
        teacherDetails: teacherDetails,
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
        <label htmlFor="storeTitle">
          {" "}
          Enter Store Title
          <input
            id="storeTitle"
            placeholder="Enter Store Title"
            onChange={(e) => setStoreTitle(e.target.value)}
          ></input>
        </label>
        <label htmlFor="storeDetails">
          {" "}
          Enter Store Details
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
        <label htmlFor="teacherDetails">
          {" "}
          Enter Teacher Details
          <input
            id="teacherDetails"
            onChange={(e) => setStoreTitle(e.target.value)}
          ></input>
        </label>
        <button type="submit" className="bg-red-500">
          Create Your Store
        </button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}

export default Page;
