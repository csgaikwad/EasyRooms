/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserAtom } from "../atoms/UserAtom";

export default function Login() {
  const [userEmail, setEmail] = useState("test@gm.com");
  const [password, setPassword] = useState("123");
  const navigate = useNavigate();
  const [user,setUser] = useRecoilState(UserAtom);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const userDetails = {
        userEmail,
        password,
      };
      const response = await axios.post("/login", userDetails);
      alert(response.data.message);



      if (response.data) {
        const UserAtomDetails = {
          isAuthenticated: true,
          userEmail: response.data.userDoc.userEmail,
          username: response.data.userDoc.username,
          isOwner: response.data.userDoc.isOwner,
        };
        document.documentElement.style.setProperty('siteColor','purple');
        setUser(UserAtomDetails);
        navigate("/");
      }
    } catch (e) {
      alert("Login failed. Please try again! Or try Registering...");
    }
  }
  return (
    <div className="h-screen p-4">
      <div className=" mt-16 flex min-w-96 items-center justify-center">
        <form
          className="flex flex-col items-center justify-center gap-5 rounded-3xl border-2 p-6 py-12 shadow-md "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="abc@gmail.com"
              value={userEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
