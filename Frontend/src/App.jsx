// eslint-disable-next-line no-unused-vars
import React from "react";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import axios from "axios";

axios.defaults.baseURL="http://localhost:8000"
axios.defaults.withCredentials=true;
export default function App() {
  return (
    <div className="">
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
