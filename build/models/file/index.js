"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
var mongoose_1 = require("mongoose");
var fileSchema = new mongoose_1.Schema({
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
}, {
    timestamps: true,
});
exports.FileModel = mongoose_1.model("File", fileSchema);
