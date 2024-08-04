// import PropertyDetails from "../models/Property.js";
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// Ensure cloudinary configuration is set before using
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function addProperty(req, res) {
//   try {
//     const {
//       title,
//       location,
//       details,
//       price,
//       numberOfGuests,
//       wifi,
//       parking,
//       tv,
//       radio,
//       pets,
//       entrance,
//       propertyPhotos,
//       user,
//     } = req.body;

//     const property = new PropertyDetails({
//       title,
//       location,
//       details,
//       price,
//       numberOfGuests,
//       wifi: wifi || false,
//       parking: parking || false,
//       tv: tv || false,
//       radio: radio || false,
//       pets: pets || false,
//       entrance: entrance || false,
//       propertyPhotos,
//       user: user.id,
//     });

//     await property.save();
//     res.status(201).json({
//       property,
//       photoUrls: propertyPhotos,
//       message: "Property Created Successfully",
//     });
//   } catch (error) {
//     console.error("Error adding property:", error);
//     res.status(500).json({ message: "An internal server error occurred" });
//   }
// }

// export async function getProperties(req, res) {
//   try {
//     const properties = await PropertyDetails.find();
//     res.status(200).json(properties);
//   } catch (error) {
//     console.error("Error fetching properties:", error);
//     res.status(500).json({ message: "An internal server error occurred" });
//   }
// }

// export async function getPropertyById(req, res) {
//   try {
//     const { propertyId } = req.params;
//     const property = await PropertyDetails.findById(propertyId);
//     if (!property)
//       return res.status(404).json({ message: "Property not found" });
//     res.status(200).json(property);
//   } catch (error) {
//     console.error("Error fetching property:", error);
//     res.status(500).json({ message: "An internal server error occurred" });
//   }
// }

// export async function updateProperty(req, res) {
//   try {
//     const { propertyId } = req.params;
//     const { user, ...updateObj } = req.body;

//     if (user && user.id) {
//       updateObj.user = user.id;
//     }

//     const updatedProperty = await PropertyDetails.updateOne(
//       { _id: propertyId },
//       updateObj
//     );

//     if (!updatedProperty)
//       return res.status(404).json({ message: "Property not found" });
//     res.status(200).json({ message: "Property updated successfully" });
//   } catch (error) {
//     console.error("Error updating property:", error);
//     res.status(500).json({ message: "An internal server error occurred" });
//   }
// }

// export async function uploadPhoto(req, res) {
//   try {
//     const file = req.files && req.files.propertyPhoto;
//     if (!file) {
//       throw new Error("No file uploaded");
//     }

//     const result = await cloudinary.uploader.upload(file.tempFilePath, {
//       folder: "property-photos",
//       public_id: `property-photos/photo-${Date.now()}`,
//     });

//     fs.unlink(file.tempFilePath, (err) => {
//       if (err) {
//         console.error("Error deleting temporary file:", err);
//       } else {
//         console.log("Temporary file deleted successfully");
//       }
//     });

//     res.json({ imageUrl: result.secure_url });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "An internal server error occurred" });
//   }
// }

// export async function deletePhoto(req, res) {
//   const { url, propertyId } = req.body;
//   try {
//     const parts = url.split("/").slice(7);
//     const publicId = parts.join("/").split(".")[0];

//     const result = await cloudinary.v2.uploader.destroy(publicId);
//     if (result.result !== "ok") {
//       throw new Error("Image not found");
//     }

//     if (propertyId) {
//       const response = await PropertyDetails.updateOne(
//         { _id: propertyId },
//         { $pull: { propertyPhotos: url } }
//       );

//       res.json({
//         success: true,
//         message: "Image and URL deleted successfully",
//       });
//     }

//     res.json({ success: true, message: "Image deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting image:", error);
//     res.status(500).json({ success: false, error: "Error deleting image" });
//   }
// }

// export async function deletePropterty(req, res) {
//   const { propertyId } = req.body;
//   try {
//     const property = await PropertyDetails.findById(propertyId);
//     if (!property) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Property not found" });
//     }

//     const imageUrls = property.propertyPhotos || [];

//     const publicIds = imageUrls.map((url) => {
//       const parts = url.split("/").slice(7);
//       return parts.join("/").split(".")[0];
//     });
//     for (const publicId of publicIds) {
//       await cloudinary.uploader.destroy(publicId);
//     }
//     await PropertyDetails.deleteOne({ _id: propertyId });

//     res.json({
//       success: true,
//       message: "Property and associated images deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting property and images:", error);
//     res
//       .status(500)
//       .json({ success: false, error: "Error deleting property and images" });
//   }
// }
