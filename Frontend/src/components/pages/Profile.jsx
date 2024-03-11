import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atoms/UserAtom";
import UserTile from "../UserTile";
import axios from "axios";

export default function Profile() {
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  const [userProperties, setUserProperties] = useState([]);

  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const response = await axios.get(`/properties/${user.id}`);
        setUserProperties(response.data);
      } catch (error) {
        console.error("Error fetching user properties:", error);
      }
    };

    if (user.isOwner) {
      fetchUserProperties();
    }
  }, [user.isOwner, user.id]);

  return (
    <div className="h-auto py-4 px-10 min-h-screen">
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
      <div className="grid grid-cols-[1fr,3fr] gap-4">
        <UserTile />
        {user.isOwner && (
          <div className="bg-blue-400 h-[40rem] rounded-xl overflow-y-scroll customScrollbar">
            {userProperties.map((property) => (
              <div key={property._id} className="bg-orange-400 h-[30rem] w-80 rounded-xl mb-4"></div>
            ))}
          </div>
        )}
        {/* hideScrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-300 */}
      </div>
    </div>
  );
}
