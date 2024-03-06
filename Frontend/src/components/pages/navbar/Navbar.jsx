/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import UserProfile from "./UserProfile";

export default function Navbar() {
  return (
    <div className="sticky top-0 px-8 bg-white stroke-lime-50 rounded-md shadow-sm border-b-2 border-gray-300">
      <div className="flex flex-col  sm:flex-row items-center gap-3 justify-center md:justify-between py-5 md:p-5 px-8">
        <Logo />
        <Searchbar />
        <UserProfile />
      </div>
    </div>
  );
}
