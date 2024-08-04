import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export async function uploadPhoto(req, res) {
  try {
    const file = req.files && req.files.propertyPhoto;
    if (!file) {
      throw new Error("No file uploaded");
    }

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "property-photos",
      public_id: `property-photos/photo-${Date.now()}`,
    });

    fs.unlink(file.tempFilePath, (err) => {
      if (err) {
        console.error("Error deleting temporary file:", err);
      } else {
        console.log("Temporary file deleted successfully");
      }
    });

    res.json({ imageUrl: result.secure_url });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}
