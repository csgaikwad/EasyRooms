import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter,  } from "react-router-dom";
import Navbar from "./components/pages/navbar/Navbar";
import Footer from "./components/pages/Footer";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Profile from "./components/pages/Profile";
import { fetchData } from "./components/functions/fetchData";
import { useRecoilState } from "recoil";
import { UserAtom } from "./components/atoms/UserAtom";
import axios from "axios";
import { Property } from "./components/pages/Property";
import Places from "./components/pages/Places";

// axios.defaults.baseURL = "https://airbnd-airbnd.koyeb.app/";
// axios.defaults.baseURL = "https://airbnd-qs5d.onrender.com";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export default function App() {
  const [user, setUser] = useRecoilState(UserAtom);

  useEffect(() => {
    async function fetchDataOnLoad() {
      try {
        await fetchData(setUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchDataOnLoad();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/property" element={<Property />} />
          <Route path="/property/:id" element={<Property />} />
          <Route path="/places/:id" element={<Places />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
