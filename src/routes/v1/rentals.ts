import express from "express";
import {
  createRental,
  deleteRental,
  getRental,
  getRentals,
  getRentalsByMe,
  updateRental,
  uploadRentalImage,
} from "../../controllers/rentals";
import { requireAuth, singleUploadCtrl } from "../../middlewares/index";

export const rentalRoutes = express.Router();

rentalRoutes.route("/rentals").get(getRentals).post(requireAuth, createRental);
rentalRoutes.route("/rentals/me").get(requireAuth, getRentalsByMe);
rentalRoutes
  .route("/rentals/upload")
  .post(requireAuth, singleUploadCtrl, uploadRentalImage);
rentalRoutes.route("/rentals/:rentalId").get(getRental);
rentalRoutes.route("/rentals/:rentalId/update").post(requireAuth, updateRental);
rentalRoutes.route("/rentals/:rentalId/delete").post(requireAuth, deleteRental);
