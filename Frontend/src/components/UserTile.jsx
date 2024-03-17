import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { UserAtom } from "./atoms/UserAtom";
import { useNavigate } from "react-router-dom";

export default function UserTile() {
  const [userData, setUserData] = useRecoilState(UserAtom);
  const navigate=useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("/me");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, []);

  async function logout() {
    try {
      const res = await axios.get("/logout");

      setUserData({
        isAuthenticated: false,
        userEmail: "",
        username: "",
        isOwner: false,
      });
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }

  return (
    <div className="flex items-start">
      {userData && (
        <div className="shadow-2xl text-lg md:text-2xl h-[20rem] md:h-[30rem] w-80 lg:w-80 bg-purple-200 rounded-xl flex flex-col items-center justify-between py-4 mb-8 ">
          <div className="size-20 md:size-28 m-1 p-1 lg:size-40 bg-purple-400 rounded-full "></div>
          <div className="text-black  my-2 grid grid-cols-[1fr,2fr] gap-4 justify-items-center ">
            <div className="flex flex-col items-end">
              <p>Name :</p>
              <p >Email : </p>
              <p>Owner : </p>
            </div>
            <div className="underline ">
              <p>{userData.username ?? "null"}</p>
              <p className="text-[1.2rem] whitespace-nowrap  truncate max-w-[170px]">{userData.userEmail ?? "null"}</p>
              <p className="text-xl">{userData.isOwner ? "Yes" : "Not an owner yet"}</p>
            </div>
          </div>
          <div
            className="bg-purple-400 p-4 my-2 shadow-lg  rounded-xl text-lg md:text-2xl underline text-white font-serif tracking-wide cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
