/* eslint-disable no-unused-vars */
import React from "react";
import {useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/login");
  }

  return (
    <div onClick={handleClick} className="h-screen pt-4">
      Home
    </div>
  );
}
