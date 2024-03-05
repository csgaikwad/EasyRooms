/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="h-screen p-4">
      <div className=" min-w-96 flex items-center justify-center mt-6">
        <form
          className="flex flex-col items-center justify-center border-2 rounded-3xl p-6 py-12 pb-2 shadow-md gap-5 "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col items-start">
            <label>Name</label>
            <input type="text" name="username" placeholder="First Last" />
          </div>
          <div className="flex flex-col items-start">
            <label>Email</label>
            <input type="email" name="email" placeholder="abc@gmail.com" />
          </div>
          <div className="flex flex-col items-start">
            <label>Password : </label>
            <input type="password" name="password" placeholder="4321" />
          </div>
          <div className="flex h-4 w-full items-center justify-start gap-2">
            <label>Owner Login: </label>
            <input
              className="appearance-none mt-1 align-text-bottom h-5 w-5 border-2 rounded-full focus:border-blue-500 checked:bg-blue-500 checked:border-none"
              type="checkbox"
              name="isOwner"
              value=""
            />
          </div>
          <button className="formButton ">Register</button>
          <Link to="/login">
            <label className=" text-blue-400 cursor-pointer">Already Registered...</label>
          </Link>
        </form>
      </div>
    </div>
  );
}
