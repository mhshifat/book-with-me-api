"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalModel = void 0;
var mongoose_1 = require("mongoose");
var rentalSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        maxlength: [128, "Invalid length! Maximum is 128 characters"],
    },
    city: { type: String, required: true, lowercase: true },
    street: {
        type: String,
        required: true,
        minlength: [4, "Invalid length! Minimum is 4 characters"],
    },
    category: { type: String, required: true, lowercase: true },
    image: { type: mongoose_1.Schema.Types.ObjectId, ref: "File" },
    numOfRooms: { type: Number, required: true },
    description: { type: String, required: true },
    dailyPrice: { type: Number, required: true },
    shared: Boolean,
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
exports.RentalModel = mongoose_1.model("Rental", rentalSchema);
