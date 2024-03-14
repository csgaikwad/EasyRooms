import React, { useState } from "react";

export default function Bar1() {
  const [hideBar, sethideBar] = useState(false);

  return (
    <div className="  searching hidden md:flex w-full items-center justify-around gap-2 rounded-full border p-2 shadow-md ">
      <div className=" searching text-md hoverable-item w-[25%] p-1 pl-2 text-center font-serif cursor-pointer">
        Where
      </div>
      <div
        onMouseEnter={() => {
          sethideBar(true);
        }}
        onMouseLeave={() => {
          sethideBar(false);
        }}
        className={` cursor-pointer searching text-md hoverable-item w-[25%] border-l-2 p-1 text-center font-serif ${
          hideBar ? "border-r-0" : "border-r-2"
        }`}
      >
        Check-In
      </div>
      <div
        onMouseEnter={() => {
          sethideBar(true);
        }}
        onMouseLeave={() => {
          sethideBar(false);
        }}
        className=" cursor-pointer searching text-md hoverable-item w-[25%] text-nowrap border-r-2 p-1 pr-4 text-center font-serif"
      >
        Check-Out
      </div>
      <div className="flex w-[25%] items-center justify-between ">
        <h1 className="cursor-pointer searching text-md hoverable-item w-14 grow p-1 text-center font-serif">
          Who
        </h1>
        <div
          className={`${user.isOwner ? "bg-purple-500" : "bg-red-500"} rounded-full border p-2 text-white transition duration-300 ease-in-out hover:scale-110 cursor-pointer `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
