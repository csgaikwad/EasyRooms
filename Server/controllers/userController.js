// routes/userRoutes.js or in your auth controller
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import config from "../config/config.js";
import fs from "fs";

export async function getUserInfo(req, res) {
  try {
    // Token comes from Authorization header now
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.secrets.jwtSecret);

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      isAuthenticated: true,
      id: user._id,
      username: user.username,
      userEmail: user.userEmail,
      profilePhoto: user.profilePhoto,
      isOwner: user.isOwner,
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

// upload new profile photo and update username, and if previous photo exists delete it from cloudinary
export async function updateProfile(req, res) {
  const { username } = req.body;
  let profilePhoto = null;

  try {
    // Get user from token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, config.secrets.jwtSecret);
    const userId = decoded.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update username if provided
    if (username && username.trim()) {
      user.username = username.trim();
    }

    // Upload photo to Cloudinary if file is sent
    if (req.files && req.files.photo) {
      const file = req.files.photo;

      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "user-profiles",
      });

      // Clean up temp file
      fs.unlink(file.tempFilePath, (err) => {
        if (err) console.error("Temp file cleanup failed:", err);
        else console.log("Temp user-profile file deleted");
      });

      // if exists, delete the old profile photo from cloudinary before adding new one to DB
      const oldProfilePhoto = user.profilePhoto;

      if (oldProfilePhoto && oldProfilePhoto != "/placeholder.jpg") {
        try {
          const oldPublicId = oldProfilePhoto
            .split("/user-profiles/")[1]
            .split(".")[0];
          console.log("url: ", oldProfilePhoto, "publicID: ", oldPublicId);

          const deleteResult = await cloudinary.uploader.destroy(
            "user-profiles/" + oldPublicId
          );
          if (deleteResult.result === "ok") {
            console.log(
              "Old profile photo successfully deleted from Cloudinary:",
              oldPublicId
            );
          } else if (deleteResult.result === "not found") {
            console.log(
              "Old profile photo not found (already deleted):",
              oldPublicId
            );
          } else {
            console.log("Unexpected delete result:", deleteResult);
          }
        } catch (deleteErr) {
          console.error(
            "Failed to delete old profile photo:",
            oldPublicId,
            deleteErr
          );
        }

        //after deleting old photo upload the new photo
        user.profilePhoto = result.secure_url;
      }
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        profilePhoto: user.profilePhoto,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Failed to update profile" });
  }
}
