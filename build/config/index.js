"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
require("dotenv/config");
var _a = process.env, _b = _a.NODE_ENV, NODE_ENV = _b === void 0 ? "development" : _b, PORT = _a.PORT, MONGODB_URI = _a.MONGODB_URI, JWT_SECRET = _a.JWT_SECRET, CLOUDINARY_NAME = _a.CLOUDINARY_NAME, CLOUDINARY_API_KEY = _a.CLOUDINARY_API_KEY, CLOUDINARY_SECRET = _a.CLOUDINARY_SECRET;
exports.config = {
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
