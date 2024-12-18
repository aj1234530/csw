"use client";
import React, { useState } from "react";
import axios from "axios";
function loginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setRespose] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const handleLoginRequest = async (e: any) => {
    //TODO -  fix the any type  to prorper
    e.preventDefault();
    //use try catch for handling error
    try {
      const response: any = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        {
          email: email,
          password: password,
        }
      );
      if ((response.status = 200)) {
        setRespose(response.data.message);
        console.log(response);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error: any) {
      //TODO - fix the any
      setError(error.response?.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleLoginRequest}>
        <label htmlFor="email">
          {" "}
          Email
          <input
            id="email"
            placeholder="enter your registered email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>
        <label htmlFor="password">
          {" "}
          Password
          <input
            id="password"
            placeholder="enter your password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>
        <button type="submit">Login</button>
      </form>
      {response && <p>{response}</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default loginForm;

//not using Form of next
