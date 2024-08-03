/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar.jsx";
import UserProfile from "./Menu";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";

export default function Navbar() {
  const user = useRecoilValue(UserAtom);

  return (
    <div className="sticky flex flex-row top-0 lg:px-8 bg-white z-50 stroke-lime-50 rounded-md shadow-sm border-b-2 border-gray-300">
      <div className="flex  flex-row w-full  flex-nowrap  items-center gap-3 justify-around  lg:p-5 px-8">

      <div>

        <Logo />
      </div>
        <Searchbar />
        {user.isAuthenticated ? (
          <></>
          ) : (
            <div className="text-lg  underline text-blue-400 font-serif tracking-tighter w-auto cursor-pointer">
            <Link to={"/login"}>Login</Link>
          </div>
        )}
        <div>

        <UserProfile />
        </div>
      </div>
    </div>
  );
}
