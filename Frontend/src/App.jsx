import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/pages/navbar/Navbar";
import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import { RecoilRoot, useSetRecoilState } from "recoil";
import axios from "axios";
import { UserAtom } from "./components/atoms/UserAtom";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
  const setUserAtom = useSetRecoilState(UserAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/me");
        const UserAtomDetails = {
          isAuthenticated: true,
          userEmail: response.data.userEmail,
          username: response.data.username,
          isOwner: response.data.isOwner,
        };
        setUserAtom(UserAtomDetails);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [setUserAtom]);

  return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
  );
}
