"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
var express_1 = __importDefault(require("express"));
var bookings_1 = require("../../controllers/bookings");
var index_1 = require("../../middlewares/index");
exports.bookingRoutes = express_1.default.Router();
exports.bookingRoutes.route("/bookings").post(index_1.requireAuth, bookings_1.createBooking);
exports.bookingRoutes.route("/bookings/me").get(index_1.requireAuth, bookings_1.getBookingsByMe);
exports.bookingRoutes
    .route("/bookings/received")
    .get(index_1.requireAuth, bookings_1.getBookingsByReceived);
exports.bookingRoutes.route("/bookings/:rentalId").get(index_1.requireAuth, bookings_1.getBookings);
exports.bookingRoutes
    .route("/bookings/:bookingId/delete")
    .post(index_1.requireAuth, bookings_1.deleteBooking);
