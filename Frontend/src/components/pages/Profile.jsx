import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atoms/UserAtom";
import UserTile from "../UserTile";
import UserProperties from "../UserProperties";

export default function Profile() {
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();


  return (
    <div className="h-auto py-4 px-10 min-h-screen mb-20">
      <div className="flex items-center justify-center gap-4 pt-2 pb-7">
        {user.isOwner && (
          <div
            className="px-8 pr-4 gap-3 cursor-pointer bg-purple-500 hover:bg-purple-700 rounded-full h-14 max-w-72 flex items-center justify-around text-white text-xl"
            onClick={() => {
              navigate("/property");
            }}
          >
            <h1 className="cursor-pointer">Add New Property</h1>
            <div className="size-10 p-1 hover:p-0 border-2 rounded-full transition-all duration-200">
              <img src="/plus.svg" alt="Add New Property" />
            </div>
          </div>
        )}
        <div
          className={`px-8 cursor-pointer ${
            user.isOwner
              ? "bg-purple-500 hover:bg-purple-700"
              : "bg-red-500 hover:bg-red-700"
          } rounded-full h-14 flex items-center justify-around text-white text-xl max-w-72`}
        >
          <p>My Bookings</p>
        </div>
      </div>
      <div className="grid  grid-cols-[1fr,4fr] gap-4">
        <UserTile />
        {user.isOwner && (
          <div className="bg-purple-200 h-[40rem] border-2 border-gray-200 shadow-lg rounded-xl overflow-y-scroll customScrollbar">
            <UserProperties/>
          </div>
        )}
        {/* hideScrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300 */}
      </div>
    </div>
  );
}
