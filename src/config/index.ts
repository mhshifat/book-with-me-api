import "dotenv/config";

const {
  NODE_ENV = "development",
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET,
} = process.env;

export const config = {
  app: {
    IN_PROD: NODE_ENV === "production",
    PORT: PORT || 5000,
  },
  db: {
    MONGODB_URI: MONGODB_URI || "",
  },
  jwt: {
    JWT_SECRET: JWT_SECRET || "asdhjfhfkdjhsfshdfhsdfhsdfjhldhfdsfh",
  },
  cloudinary: {
    CLOUDINARY_NAME: CLOUDINARY_NAME || "",
    CLOUDINARY_API_KEY: CLOUDINARY_API_KEY || "",
    CLOUDINARY_SECRET: CLOUDINARY_SECRET || "",
  },
};

export type ConfigType = typeof config;
