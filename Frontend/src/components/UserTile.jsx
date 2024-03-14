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
    <div className="flex items-center">
      {userData && (
        <div className="shadow-2xl h-[30rem] w-96 bg-purple-200 rounded-xl flex flex-col items-center justify-between py-4">
          <div className="size-40 bg-purple-400 rounded-full"></div>
          <div className="text-black text-2xl my-2 grid grid-cols-[2fr,2fr]  justify-items-center">
            <div className="flex flex-col items-end">
              <p>Username:</p>
              <p>Email: </p>
              <p>Owner: </p>
            </div>
            <div className="underline">
              <p>{userData.username ?? "null"}</p>
              <p>{userData.userEmail ?? "null"}</p>
              <p className="text-xl">{userData.isOwner ? "Yes" : "Not an owner yet"}</p>
            </div>
          </div>
          <div
            className="bg-purple-400 p-4 my-2 shadow-lg  rounded-xl text-2xl underline text-white font-serif tracking-wide cursor-pointer"
            onClick={logout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
