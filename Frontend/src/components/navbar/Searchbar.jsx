import React, { useState, useEffect } from "react";

export default function Searchbar() {
  const [showFirstBar, setShowFirstBar] = useState(true);
  const [hideBar, sethideBar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 50) {
        setShowFirstBar(true);
      } else {
        setShowFirstBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 w-[70%] md:w-125 ">
      {showFirstBar ? (
        <div className=" searching hidden md:flex w-full border rounded-full flex justify-around p-2 gap-2 items-center shadow-md">
          <div className=" font-serif searching w-[25%] pl-2 p-1 text-md hoverable-item text-center">
            Where
          </div>
          <div
            onMouseEnter={() => {
              sethideBar(true);
            }}
            onMouseLeave={() => {
              sethideBar(false);
            }}
            className={`searching font-serif w-[25%] border-l-2 p-1 text-md hoverable-item text-center ${
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
            className="searching w-[25%] border-r-2 p-1 text-nowrap pr-4 text-md hoverable-item text-center font-serif"
          >
            Check-Out
          </div>
          <div className="flex justify-between w-[25%] items-center ">
            <h1 className="searching p-1 text-md hoverable-item grow text-center w-14 font-serif">
              Who
            </h1>
            <div className="transition duration-300 ease-in-out transform hover:scale-110 border rounded-full p-2 basicColor text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
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
      ) : (
        <div className=" searching min-w-80 w-[50%] border rounded-full flex justify-around md:p-2 gap-2 items-center shadow-md ">
          <div className="searching w-[33%] pl-2 p-1 text-md hoverable-item text-center font-serif">
            Anywhere
          </div>
          <div className="searching w-[33%] border-x-2 p-1 text-md hoverable-item text-center font-serif">
            Anyweek
          </div>
          <div className="searching flex justify-between w-[33%] items-center ">
            <h1 className="p-1 text-md hoverable-item text-center md:w-24 md:text-nowrap font-serif">
              Add Guest
            </h1>
            <div className=" transition duration-300 ease-in-out transform hover:scale-110 border rounded-full p-2 basicColor text-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
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
      )}
    </div>
  );
}
