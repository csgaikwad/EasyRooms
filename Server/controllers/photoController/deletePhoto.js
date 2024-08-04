import "../../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import PropertyDetails from "../../models/Property.js";

export async function deletePhoto(req, res) {
  const { url, propertyId } = req.body;
  try {
    const parts = url.split("/").slice(7);
    const publicId = parts.join("/").split(".")[0];

    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== "ok") {
      throw new Error("Image not found");
    }

    if (propertyId) {
      const response = await PropertyDetails.updateOne(
        { _id: propertyId },
        { $pull: { propertyPhotos: url } }
      );

      return res.json({
        success: true,
        message: "Image and URL deleted successfully",
      });
    }

    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ success: false, error: "Error deleting image" });
  }
}
