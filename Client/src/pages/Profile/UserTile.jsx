import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { UserAtom } from "../../atoms/UserAtom";
import api from "../../utils/axios";

export default function UserTile() {
  const userDataLoadable = useRecoilValueLoadable(UserAtom);
  const setUserData = useSetRecoilState(UserAtom);
  const navigate = useNavigate();

  const [editing, setEditing] = useState(true);
  const [newUsername, setNewUsername] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

  const user = userDataLoadable.contents || {};

  useEffect(() => {
    if (userDataLoadable.state === "hasValue" && editing) {
      setNewUsername(user.username || "");
    }
  }, [editing, userDataLoadable]);

  async function fetchUserData() {
    try {
      const response = await api.get("/user/me");
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) return;

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, and GIF files are allowed");
      e.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError(
        `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      );
      e.target.value = "";
      return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    const formData = new FormData();
    if (newUsername && newUsername !== user.username) {
      formData.append("username", newUsername);
    }
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    if (!formData.has("username") && !formData.has("photo")) {
      setEditing(false);
      return;
    }

    try {
      const res = await api.patch("/user/updateProfile", formData);
      setUserData((prev) => ({
        ...prev,
        username: res.data.user.username,
        profilePhoto: res.data.user.profilePhoto,
      }));
      setEditing(false);
      setPhotoFile(null);
      setPhotoPreview(null);
    } catch (err) {
      alert(
        "Failed to update profile: " +
          (err.response?.data?.message || err.message)
      );
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setNewUsername(user.username || "");
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  async function logout() {
    localStorage.removeItem("token");
    setUserData({
      isAuthenticated: false,
      id: null,
      username: null,
      userEmail: null,
      isOwner: false,
      profilePhoto: null,
    });
    navigate("/login");
  }

  if (userDataLoadable.state !== "hasValue") {
    return <div className="text-center py-10">Loading user...</div>;
  }

  return (
    <div className="flex justify-center my-10">
      <div className="bg-purple-50 rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={photoPreview || user.profilePhoto || "/placeholder.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
            />
            {editing && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}{" "}
        </div>

        {/* User Info */}
        <div className="space-y-4 text-center">
          {editing ? (
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="text-2xl font-bold text-gray-800 text-center bg-gray-100 rounded-lg px-4 py-2 !w-60"
              placeholder="Enter username"
              autoFocus
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-800">
              {user.username || "Guest User"}
            </h2>
          )}

          <p className="text-gray-600">{user.userEmail || "Not logged in"}</p>
          <p className="text-lg font-medium text-purple-700">
            {user.isOwner ? "Property Owner" : "Guest"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col gap-4">
          {user.isAuthenticated ? (
            <>
              {editing ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium p-3 rounded-xl transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-3 rounded-xl transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={logout}
                className="flex gap-2 justify-center bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-xl transition"
              >
                <img src="/logout.svg" className="h-7 " />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
