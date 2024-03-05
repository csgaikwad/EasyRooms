/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="h-screen p-4">
      <div className=" min-w-96 flex items-center justify-center mt-16">
        <form
          className="flex flex-col items-center justify-center border-2 rounded-3xl p-6 py-12 shadow-md gap-5 "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start">
            <label>Email</label>
            <input type="email" name="email" placeholder="abc@gmail.com" />
          </div>
          <div className="flex flex-col items-start">
            <label>Password : </label>
            <input type="password" name="password" placeholder="4321" />
          </div>
          <button className="formButton">Login</button>
          <Link to="/register">
            <label className=" cursor-pointer text-blue-400">
              Not Registered...
            </label>
          </Link>
        </form>
      </div>
    </div>
  );
}
