"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
var multer_1 = __importDefault(require("multer"));
var ALLOWED_FORMAT = ["image/jpeg", "image/png", "image/jpg"];
exports.uploadImage = multer_1.default({
    storage: multer_1.default.memoryStorage(),
    fileFilter: function (req, file, cb) {
        if (ALLOWED_FORMAT.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            // @ts-ignore
            cb(new Error("Invalid file format!"), false);
        }
    },
});
