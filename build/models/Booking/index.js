"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingModel = void 0;
var mongoose_1 = require("mongoose");
var bookingSchema = new mongoose_1.Schema({
    startAt: { type: Date, required: "Starting date is required" },
    endAt: { type: Date, required: "Ending date is required" },
    price: { type: Number, required: true },
    nights: { type: Number, required: true },
    guests: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    rental: { type: mongoose_1.Schema.Types.ObjectId, ref: "Rental", required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });
exports.BookingModel = mongoose_1.model("Booking", bookingSchema);
