/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";
import Swal from "sweetalert2";
import api from "../../utils/axios";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("ab");
  const [userEmail, setUserEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("123");
  const [isOwner, setisOwner] = useState(false);
  const [user, setUser] = useRecoilState(UserAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const userDetails = {
        username,
        userEmail,
        password,
        isOwner,
      };
      const response = await api.post("/register", userDetails);
      // alert(response.data.message);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Registration Successful",
        showConfirmButton: false,
        timer: 1000,
      });
      if (response.data) {
        const UserAtomDetails = {
          isAuthenticated: true,
          userEmail: response.data.ResUserDoc.userEmail,
          username: response.data.ResUserDoc.username,
          isOwner: response.data.ResUserDoc.isOwner,
        };
        setUser(UserAtomDetails);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Registration failed",
        timer: 1000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className=" md:min-w-96 flex items-center justify-center mb-4 md:mt-6">
          <form
            className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 py-12"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold font-serif text-center mb-8 text-gray-700">
              Create Your Account
            </h2>
            <div className="flex flex-col items-start">
              <label>Name</label>
              <input
                type="text"
                name="username"
                placeholder="First Last"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
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
                onChange={(e) => {
                  setUserEmail(e.target.value);
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
            <div className="flex items-center gap-3 mt-2">
              {" "}
              <label>Owner Login: </label>
              <input
                className="appearance-none mt-1 align-text-bottom size-5 border-2 rounded-full focus:border-blue-500 checked:bg-blue-500 checked:border-none"
                type="checkbox"
                name="isOwner"
                value={isOwner}
                checked={isOwner}
                onChange={(e) => {
                  setisOwner(e.target.checked);
                }}
              />
            </div>
            <button
              className={`basicButton ${user.isOwner ? "bg-purple-500" : "bg-red-500"} flex justify-center items-center`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  Loading...
                  <img
                    className="size-8 filter invert brightness-0"
                    src="/loader.svg"
                    alt="loader"
                  />
                </div>
              ) : (
                "Register"
              )}
            </button>
            <div className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors duration-200"
              >
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
