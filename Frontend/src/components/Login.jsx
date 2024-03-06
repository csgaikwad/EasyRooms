/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function Login() {
  const [email, setEmail] = useState("ab@g");
  const [password, setPassword] = useState("123");

  return (
    <div className="h-screen p-4">
      <div className=" mt-16 flex min-w-96 items-center justify-center">
        <form
          className="flex flex-col items-center justify-center gap-5 rounded-3xl border-2 p-6 py-12 shadow-md "
          onSubmit={async(e) => {
            e.preventDefault();
            const userDetails={
              email,password
            }
            await axios.post("http://localhost:8000/login",userDetails)
          }}
        >
          <div className="flex flex-col items-start">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          </div>
          <div className="flex flex-col items-start">
            <label>Password : </label>
            <input
              type="password"
              name="password"
              placeholder="4321"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              required
            />
          </div>
          <button className="formButton">Login</button>
          <Link to="/register">
            <label className=" cursor-pointer text-blue-400">
              Not Registered yet...?
            </label>
          </Link>
        </form>
      </div>
    </div>
  );
}
