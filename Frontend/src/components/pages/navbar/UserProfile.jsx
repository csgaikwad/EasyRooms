import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";
import Avatar from "react-avatar";
import { fetchData } from "../../functions/fetchData";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(UserAtom);
  const [showDiv, setShowDiv] = useState(false);

  function showDivOnEvent() {
    setShowDiv((prev) => !prev);
  }

  useEffect(() => {
    async function fetchDataOnLogin() {
      try {
        await fetchData(setUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchDataOnLogin();
  }, [setUser]);
  return (
    <div className="flex items-center w-auto md:w-24 lg:w-auto h-10 border-2 rounded-full py-6 px-2 pl-2 gap-1 shadow-md">
      <div
        className="transition duration-300 ease-in-out transform hover:scale-125 cursor-pointer"
        onClick={showDivOnEvent}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div
          onMouseLeave={showDivOnEvent}
          className={`block py-2 border-2 rounded-md bg-gray-50 shadow-md p-2 absolute top-10 left-[-20px] ${showDiv ? "" : "hidden"}`}
        >
          <div
            className="border-b-2 text-xl font-serif"
            onClick={() => {
              navigate("/home");
            }}
          >
            Home
          </div>
          <div
            className="border-b-2 text-xl font-serif"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </div>
          <div
            className=" text-xl font-serif"
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </div>
        </div>
      </div>
      <div
        onClick={() =>
          user.isAuthenticated ? navigate("/profile") : navigate("/login")
        }
      >
        {user.username ? (
          <div className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-110">
            <Avatar
              name={user.username}
              size="40"
              round={true}
              color={`${user.isOwner ? "#8B5CF6" : "#EF4444"}`}
              fgColor="#fff"
              className="avatar-class "
            />
          </div>
        ) : (
          <div className="cursor-pointer transition duration-300 ease-in-out transform hover:scale-125">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gray"
              className="w-10 h-10"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
