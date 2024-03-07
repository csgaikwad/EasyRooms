import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAtom } from "../../atoms/UserAtom";
import { useRecoilValue } from "recoil";

export default function Logo() {
  const navigate = useNavigate();
  const user = useRecoilValue(UserAtom);
  function goToHome() {
    navigate("/");
  }
  return (
    <div onClick={goToHome} className="flex items-center gap-1 cursor-pointer">
      <div className="relative size-10">
        {user.isOwner ? (
          <img
            src="/purpleLogo.svg"
            alt="Logo"
            className="size-full transition-transform duration-500 ease-in-out rotate-360 mt-1 "
          />
        ) : (
          <img
            src="/logo2.svg"
            alt="Logo"
            className="size-full transition-transform duration-500 ease-in-out rotate-360"
          />
        )}
      </div>
      <div className={`${user.isOwner? "text-purple-800" : "text-red-500"}`}>

      <h1 className=" text-2xl font-bold font-serif  underline transition duration-300 ease-in-out transform hover:scale-90 cursor-pointer">
        Airbnd
      </h1>
      </div>
    </div>
  );
}
