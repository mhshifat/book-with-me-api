import cloudinary from "cloudinary";
import { config } from "../config/index";

cloudinary.v2.config({
  cloud_name: config.cloudinary.CLOUDINARY_NAME,
  api_key: config.cloudinary.CLOUDINARY_API_KEY,
  api_secret: config.cloudinary.CLOUDINARY_SECRET,
});

export const uploadImageToCloudinary = (file: any) =>
  cloudinary.v2.uploader.upload(file);
