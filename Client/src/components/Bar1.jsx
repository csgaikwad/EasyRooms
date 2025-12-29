import React from "react";

export default function Bar1({ user , fullBar }) {
  return (
    <div
      className={` overflow-hidden searching hidden md:flex items-center justify-around gap-2 rounded-full border p-2 shadow-md ${fullBar ? "my-4 w-full" : "my-0 w-[50%]"} `}
    >
      <div className=" searching text-sm hoverable-item w-full p-1 pl-2 text-center font-serif cursor-pointer">
        Where
      </div>
      <div className="cursor-pointer searching text-sm hoverable-item w-full border-l-2 border-r-2 p-1 text-center font-serif overflow-hidden">
        When
      </div>
      <div className="flex w-full items-center justify-between ">
        <h1 className="cursor-pointer searching text-sm hoverable-item w-full grow p-1 text-center font-serif overflow-hidden ">
          Who
        </h1>
        <div
          className={`${user.isOwner ? "bg-purple-500" : "bg-red-500"} rounded-full border p-2 text-white transition duration-300 ease-in-out hover:scale-110 cursor-pointer z-10 `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
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
