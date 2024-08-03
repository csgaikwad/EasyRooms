import PropertyDetails from "../models/Property.js";
import cloudinary from "cloudinary";
import fs from "fs";

// Ensure cloudinary configuration is set before using
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function addProperty(req, res) {
  try {
    const {
      title,
      location,
      details,
      price,
      numberOfGuests,
      wifi,
      parking,
      tv,
      radio,
      pets,
      entrance,
      propertyPhotos,
      user,
    } = req.body;

    const property = new PropertyDetails({
      title,
      location,
      details,
      price,
      numberOfGuests,
      wifi: wifi || false,
      parking: parking || false,
      tv: tv || false,
      radio: radio || false,
      pets: pets || false,
      entrance: entrance || false,
      propertyPhotos,
      user: user.id,
    });

    await property.save();
    res.status(201).json({
      property,
      photoUrls: propertyPhotos,
      message: "Property Created Successfully",
    });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}

export async function getProperties(req, res) {
  try {
    const properties = await PropertyDetails.find();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}

export async function getPropertyById(req, res) {
  try {
    const { propertyId } = req.params;
    const property = await PropertyDetails.findById(propertyId);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}

export async function updateProperty(req, res) {
  try {
    const { propertyId } = req.params;
    const { user, ...updateObj } = req.body;

    if (user && user.id) {
      updateObj.user = user.id;
    }

    const updatedProperty = await PropertyDetails.updateOne({_id : propertyId }, updateObj );

    if (!updatedProperty)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json({ message: "Property updated successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
}


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

    console.log("Cloudinary upload result:", result);
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
