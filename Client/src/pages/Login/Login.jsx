import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";
import Swal from "sweetalert2";
import api from "../../utils/axios";

export default function Login() {
  const [userEmail, setEmail] = useState("owner1@gmail.com");
  const [password, setPassword] = useState(""); //123
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(UserAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { userEmail, password });

      if (response.data.token) {
        // Save token
        localStorage.setItem("token", response.data.token);

        // Set user in Recoil
        setUser({
          isAuthenticated: true,
          id: response.data.user.id,
          userEmail: response.data.user.userEmail,
          username: response.data.user.username,
          profilePhoto: response.data.user.profilePhoto,
          isOwner: response.data.user.isOwner,
        });

        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "Login successful",
          timer: 1000,
        });

        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.error ||
          "Invalid email or password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <form
          className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 py-12"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold font-serif text-center mb-8 text-gray-700 ">
            Welcome Back
          </h2>
          <div className="flex flex-col items-start">
            <label>Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="abc@gmail.com"
              value={userEmail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="email"
            />
          </div>
          <div className=" flex flex-col items-start">
            <label>Password : </label>
            <input
              type="password"
              name="password"
              placeholder="4321"
              value={password}
              min={6}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button
            className={`basicButton ${user.isOwner ? "bg-purple-500" : "bg-red-500"} flex justify-center items-center`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                Logging in...
                <img
                  className="size-8 filter invert brightness-0"
                  src="/loader.svg"
                  alt="loader"
                />
              </div>
            ) : (
              "Login"
            )}
          </button>
          <div className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors duration-200"
            >
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
