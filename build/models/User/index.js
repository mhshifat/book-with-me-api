"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        minlength: [4, "Invalid length! Minimum is 4 characters"],
        maxlength: [32, "Invalid length! Maximum is 32 characters"],
    },
    email: {
        type: String,
        minlength: [4, "Invalid length! Minimum is 4 characters"],
        maxlength: [32, "Invalid length! Maximum is 32 characters"],
        unique: true,
        lowercase: true,
        required: "Email is required!",
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
    },
    password: {
        type: String,
        required: "Password is required!",
    },
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.model("User", userSchema);
