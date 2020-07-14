"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToCloudinary = void 0;
var cloudinary_1 = __importDefault(require("cloudinary"));
var index_1 = require("../config/index");
cloudinary_1.default.v2.config({
    cloud_name: index_1.config.cloudinary.CLOUDINARY_NAME,
    api_key: index_1.config.cloudinary.CLOUDINARY_API_KEY,
    api_secret: index_1.config.cloudinary.CLOUDINARY_SECRET,
});
exports.uploadImageToCloudinary = function (file) {
    return cloudinary_1.default.v2.uploader.upload(file);
};
