/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";

export default function Navbar() {
  const [user, setUser] = useRecoilState(UserAtom);

  return (
    <div className="sticky top-0 px-8 bg-white z-20 stroke-lime-50 rounded-md shadow-sm border-b-2 border-gray-300">
      <div className="flex flex-col  sm:flex-row items-center gap-3 justify-center md:justify-between py-5 md:p-5 px-8">
        <Logo />
        <Searchbar />
        {!user.isAuthenticated && (
          <div className="text-2xl underline text-blue-400 font-serif tracking-tighter w-auto cursor-pointer">
            <Link to={"/login"}>Login</Link>
          </div>
        )}

        <UserProfile />
      </div>
    </div>
  );
}
