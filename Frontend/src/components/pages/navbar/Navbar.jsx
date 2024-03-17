/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";

export default function Navbar() {
  const [user, setUser] = useRecoilState(UserAtom);
  const [hideLogin,setHideLogin]= useState(false);
  useEffect(() => {
    window.scrollTo(0,0);
    user.isAuthenticated && setHideLogin(user.isAuthenticated)
  }, [user.isAuthenticated,user]);

  return (
    <div className="sticky flex flex-row top-0 lg:px-8 bg-white z-20 stroke-lime-50 rounded-md shadow-sm border-b-2 border-gray-300">
      <div className="flex  flex-row w-full h-16 lg:h-auto flex-nowrap  items-center gap-3 justify-around py-5 lg:p-5 px-8">
      
      <div>

        <Logo />
      </div>
        <Searchbar />
        {hideLogin ? (
          <></>
          ) : (
            <div className="text-2xl underline text-blue-400 font-serif tracking-tighter w-auto cursor-pointer">
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
