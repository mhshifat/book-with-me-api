"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
var index_1 = require("./Booking/index");
var index_2 = require("./file/index");
var index_3 = require("./Rental/index");
var index_4 = require("./User/index");
exports.models = {
    Rental: index_3.RentalModel,
    User: index_4.UserModel,
    Booking: index_1.BookingModel,
    File: index_2.FileModel,
};
