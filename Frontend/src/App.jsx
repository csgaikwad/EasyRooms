// eslint-disable-next-line no-unused-vars
import React from "react";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <div className="">
      <Navbar />
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
