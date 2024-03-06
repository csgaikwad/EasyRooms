/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("ab");
  const [userEmail, setUserEmail] = useState("test@gm.com");
  const [password, setPassword] = useState("123");
  const [isOwner, setisOwner] = useState(false);

  return (
    <div className="h-screen p-4">
      <div className=" min-w-96 flex items-center justify-center mt-6">
        <form
          className="flex flex-col items-center justify-center border-2 rounded-3xl p-6 py-12 pb-2 shadow-md gap-5 "
          onSubmit={async(e) => {
            e.preventDefault();


           try{
             const userDetails={
              username,
              userEmail,
              password,
              isOwner
            }
            const response = await axios.post("/register",userDetails)
            alert(response.data.message)
          }catch(e){
            alert("Registeration failed.Please try again! later")
          }

          }}
        >
          <div className="flex flex-col items-start">
            <label>Name</label>
            <input
              type="text"
              name="username"
              placeholder="First Last"
              value={username}
              onChange={(e) => { setUsername(e.target.value)}}
              required
            />
          </div>
          <div className="flex flex-col items-start">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              value={userEmail}
              onChange={(e) => { setUserEmail(e.target.value)}}
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
              onChange={(e) => { setPassword(e.target.value)}}
              required
            />
          </div>
          <div className="flex h-4 w-full items-center justify-start gap-2">
            <label>Owner Login: </label>
            <input
              className="appearance-none mt-1 align-text-bottom size-5 border-2 rounded-full focus:border-blue-500 checked:bg-blue-500 checked:border-none"
              type="checkbox"
              name="isOwner"
              value={isOwner}
              checked={isOwner}
              onChange={(e) => { setisOwner(e.target.checked)}}
            />
          </div>
          <button className="formButton ">Register</button>
          <Link to="/login">
            <label className=" text-blue-400 cursor-pointer">
              Already Registered...
            </label>
          </Link>
        </form>
      </div>
    </div>
  );
}
