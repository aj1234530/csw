"use client";
import React, { useState } from "react";
import axios from "axios";
function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<null | string>(null);
  const handleSubmit = async (e: any) => {
    //writing any for now
    e.preventDefault();
    const response: any = await axios.post(
      //todo - define better types here
      "http://localhost:3000/api/v1/auth/signup",
      {
        email: email,
        username: username,
        password: password,
      }
    );
    if (response.status == 200) {
      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
    }
    if (response.status !== 200) {
      setError("some error occured , check your inputs");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">
            {" "}
            Username
            <input
              id="email"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="enter your username"
              required
            ></input>
          </label>

          <label htmlFor="email">
            {" "}
            Email
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter your email"
              required
            ></input>
          </label>
          <label htmlFor="password">
            {" "}
            Password
            <input
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password of 8 characters or more"
              required
            ></input>
          </label>
          <button type="submit">Signup</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignupForm;
