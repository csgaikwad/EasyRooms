import React, { useEffect, useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { UserAtom } from "../atoms/UserAtom";
import { useNavigate } from "react-router-dom";
import CreateProperties from "../CreateProperty";

export function Property() {
  const userDataLoadable = useRecoilValueLoadable(UserAtom);
  const [userAuth, setUserAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDataLoadable.state === "hasValue") {
      setUserAuth(userDataLoadable.contents.isAuthenticated || false);
    }
  }, [userDataLoadable]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-auto">
      <div className="flex items-center justify-center">
        {userAuth ? (
          <div className="lg:w-full flex flex-col justify-center items-center">
            <div className="pt-8">
              <h1 className="text-xl font-medium">
                Add your new properties here{" "}
                <span className="cursor-default font-bold text-xl text-purple-500 underline capitalize">
                  {userDataLoadable.contents.username}!
                </span>
              </h1>
            </div>
            <CreateProperties />
          </div>
        ) : (
          <div className="h-screen flex items-center">
            <h1 className="text-2xl text-red-500">
              Unauthorized access. Please log in as an owner or try refreshing the page.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
