/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atoms/UserAtom";

export default function Home() {
  const user = useRecoilValue(UserAtom);
  const navigate = useNavigate();
  function handleClick() {
    !user.isAuthenticated && navigate("/login");
  }

  return (
    <div onClick={handleClick} className="h-screen pt-4 px-10">
      Home
    </div>
  );
}
