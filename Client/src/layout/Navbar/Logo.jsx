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
    <div
      onClick={goToHome}
      className="flex items-center gap-1 cursor-pointer hover:scale-105 duration-150 bg-white rounded-lg"
    >
      <div className="relative size-8 lg:size-8 ">
        {user.isOwner ? (
          <img src="/purpleLogo.svg" alt="Logo" className="size-full " />
        ) : (
          <img src="/logo2.svg" alt="Logo" className="size-full" />
        )}
      </div>
      {/* <div className={`${user.isOwner? "text-purple-700" : "text-red-500"}`}> */}
      <div className="">
        <h1 className=" text-2xl font-bold font-serif  underline transition duration-300 ease-in-out transform cursor-pointer gradient-text">
          EasyRooms
        </h1>
      </div>
    </div>
  );
}
