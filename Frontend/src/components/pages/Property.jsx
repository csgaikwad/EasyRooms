import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../atoms/UserAtom";
import { useNavigate } from "react-router-dom";
import CreateProperties from "../CreateProperty";

export function Property() {
  const user = useRecoilValue(UserAtom);
  const [loading, setLoading] = useState(true);
  const [userAuth, setUserAuth] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setUserAuth(user.isOwner);
  }, [user, user.isOwner]);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    if (!loading && !user.isOwner) {
      setTimeout(() => {
        alert("Try Logging in again");
        // navigate("/login");
      }, 2000);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      if (!user.isOwner) {
        alert("Not an Owner bye bye ");
        navigate("/profile");
      } else {
        console.log("Not auth");
      }
    }
  }, [user, loading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [user.isAuthenticated, user]);

  return (
    <div className="h-auto">
      <div className="flex items-center justify-center">
        {userAuth ? (
          <div className="lg:w-full flex flex-col justify-center items-center">
            <div className="pt-8">
              <h1 className="text-xl font-medium">
                Add your new properties here{" "}
                <span className=" cursor-default font-bold text-xl text-purple-500 underline capitalize">
                  {user.username}!
                </span>
              </h1>
            </div>
            <CreateProperties />
          </div>
        ) : loading ? (
          <div className="h-screen flex items-center text-2xl text-pink-500">
            <h1>Loading... </h1>
            <img src="/loader.svg" />
          </div>
        ) : (
          <div className="h-screen flex items-center">
            <h1 className=" text-2xl text-red-500 ">
              Unauthorized Access Try Loggin In...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
