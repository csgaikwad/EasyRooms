import { v2 as cloudinary } from 'cloudinary';

// Upload an image to Cloudinary
export async function uploadImageToCloudinary(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "property-photos",
    public_id: `property-photos/photo-${Date.now()}`,
  });
  return result.secure_url;
}
