import "../../config/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import PropertyDetails from "../../models/Property.js";

export async function deletePhoto(req, res) {
  const { url, propertyId } = req.body;
  try {
    const parts = url.split("/property-photos/property-photos/")[1];
    const publicId = parts.split(".")[0];

    const deleteResult = await cloudinary.uploader.destroy(
      "property-photos/property-photos/" + publicId
    );

    if (deleteResult.result === "ok") {
      console.log(
        "Old profile photo successfully deleted from Cloudinary:",
        publicId
      );
    } else if (deleteResult.result === "not found") {
      console.log("Old profile photo not found (already deleted):", publicId);
    } else {
      console.log("Unexpected delete result:", deleteResult);
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
