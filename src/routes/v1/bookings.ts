import express from "express";
import {
  createBooking,
  deleteBooking,
  getBookings,
  getBookingsByMe,
  getBookingsByReceived,
} from "../../controllers/bookings";
import { requireAuth } from "../../middlewares/index";

export const bookingRoutes = express.Router();

bookingRoutes.route("/bookings").post(requireAuth, createBooking);
bookingRoutes.route("/bookings/me").get(requireAuth, getBookingsByMe);
bookingRoutes
  .route("/bookings/received")
  .get(requireAuth, getBookingsByReceived);
bookingRoutes.route("/bookings/:rentalId").get(requireAuth, getBookings);
bookingRoutes
  .route("/bookings/:bookingId/delete")
  .post(requireAuth, deleteBooking);
