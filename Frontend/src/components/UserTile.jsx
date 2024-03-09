import React from "react";

export default function UserTile() {
  async function logout() {
    try {
      const res = await axios.get("/logout");

      setUser({
        isAuthenticated: false,
        userEmail: "",
        username: "",
        isOwner: false,
      });
    } catch (err) {
      throw Error(err);
    }
  }
  return (
    <div className=" flex  items-center ">
      <div className=" shadow-2xl h-[30rem] w-96 bg-gray-500 rounded-xl flex flex-col items-center justify-between pt-4  ">
        <div className="size-40 bg-pink-400 rounded-full "></div>
        <div
          className=" bg-white py-2 px-4 rounded-xl  text-2xl underline text-blue-400 font-serif tracking-tighter cursor-pointer"
          onClick={logout}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
