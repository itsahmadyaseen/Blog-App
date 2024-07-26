import {v2 as cloudinary} from "cloudinary";
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (thumbnailLocalPath) => {
  try {
    // console.log('api_key', api_key);
    console.log('thumbnailLocalPath', thumbnailLocalPath);
    if (!thumbnailLocalPath) return null;

    const response = await cloudinary.uploader.upload(thumbnailLocalPath, {
      resource_type: "auto",
    });
    if (!response) console.log("Bad response", response);
    console.log('response', response);
    console.log("File uploaded on cloudinary");
    return response.secure_url;
  } catch (error) {
    console.log("Error uploading file on cloudinary", error);
  }
};

export const deleteOnCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    const deleteResponse = await cloudinary.uploader.destroy(publicId);

    console.log("File deleted on cloudinary");
    return deleteResponse;
  } catch (error) {
    console.log("Error deleting file on cloudinary", error);
  }
};
