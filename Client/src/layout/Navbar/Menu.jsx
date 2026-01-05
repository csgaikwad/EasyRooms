import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";
import Avatar from "react-avatar";
import fetchData from "../../utils/fetchData";

export default function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(UserAtom);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    async function fetchDataOnLoad() {
      try {
        await fetchData(setUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchDataOnLoad();
  }, [setUser]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setShowMenu((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({ isAuthenticated: false });
    setShowMenu(false);
    navigate("/login");
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Profile", path: "/profile" },
    ...(user.isAuthenticated
      ? [{ label: "Logout", action: handleLogout }]
      : [{ label: "Login", path: "/login" }]),
  ];

  return (
    <div className="relative flex items-center gap-3">
      {/* Avatar */}
      <button
        onClick={() =>
          user.isAuthenticated ? navigate("/profile") : navigate("/login")
        }
        className="cursor-pointer"
      >
        {user.username ? (
          <Avatar
            name={user.username}
            size="40"
            round={true}
            color={user.isOwner ? "#8B5CF6" : "#EF4444"}
            fgColor="#fff"
            className="ring-2 ring-white shadow-md hover:scale-105 duration-200"
          />
        ) : (
          <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-gray-600"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </button>
      {/* Hamburger Menu */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
        aria-label="Open menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-6 h-6 text-gray-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50"
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.action) item.action();
                else navigate(item.path);
                setShowMenu(false);
              }}
              className="w-full px-5 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors duration-150 font-medium"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
