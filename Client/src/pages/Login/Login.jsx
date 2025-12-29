import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";
import Swal from "sweetalert2";

export default function Login() {
  const [userEmail, setEmail] = useState("owner1@gm.com");
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
      const response = await api.post("/login", { userEmail, password });

      if (response.data.token) {
        // Save token
        localStorage.setItem("token", response.data.token);

        // Set user in Recoil
        setUser({
          isAuthenticated: true,
          id: response.data.user.id,
          userEmail: response.data.user.userEmail,
          username: response.data.user.username,
          isOwner: response.data.user.isOwner,
        });

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1000,
        });

        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.error || "Please try again",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen p-4 z-0">
      <div className=" lg:mt-8 flex md:min-w-96 items-center justify-center">
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
                Loading...
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
