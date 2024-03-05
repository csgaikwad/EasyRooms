import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center">
    <div className="relative w-20 h-20">
      <img
        src="/logo2.svg"
        alt="Logo"
        className="w-full h-full transition-transform duration-500 ease-in-out rotate-360"
      />
    </div>
      <h1 className="text-2xl font-bold text-red-500 font-serif">Airbnd</h1>
    </div>
  );
}
