import PropertyDetails from "../../models/Property.js";
import { v2 as cloudinary } from "cloudinary";

export async function deleteProperty(req, res) {
  const { propertyId } = req.body;
  try {
    const property = await PropertyDetails.findById(propertyId);
    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    const imageUrls = property.propertyPhotos || [];

    const publicIds = imageUrls.map((url) => {
      const parts = url.split("/").slice(7);
      return parts.join("/").split(".")[0];
    });
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(publicId);
    }
    await PropertyDetails.deleteOne({ _id: propertyId });

    res.json({
      success: true,
      message: "Property and associated images deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting property and images:", error);
    res
      .status(500)
      .json({ success: false, error: "Error deleting property and images" });
  }
}
