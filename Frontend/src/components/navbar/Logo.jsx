import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate=useNavigate();
  function goToHome(){
    navigate("/");
  }
  return (
    <div onClick={goToHome} className="flex items-center gap-1 cursor-pointer">
    <div className="relative size-10">
      <img
        src="/logo2.svg"
        alt="Logo"
        className="size-full transition-transform duration-500 ease-in-out rotate-360"
      />
    </div>
      <h1 className="text-2xl font-bold basicLogo font-serif transition-all duration-300 mt-1 underline">Airbnd</h1>
    </div>
  );
}
