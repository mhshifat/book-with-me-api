"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
var express_1 = __importDefault(require("express"));
var rentals_1 = require("../../controllers/rentals");
var index_1 = require("../../middlewares/index");
exports.rentalRoutes = express_1.default.Router();
exports.rentalRoutes.route("/rentals").get(rentals_1.getRentals).post(index_1.requireAuth, rentals_1.createRental);
exports.rentalRoutes.route("/rentals/me").get(index_1.requireAuth, rentals_1.getRentalsByMe);
exports.rentalRoutes
    .route("/rentals/upload")
    .post(index_1.requireAuth, index_1.singleUploadCtrl, rentals_1.uploadRentalImage);
exports.rentalRoutes.route("/rentals/:rentalId").get(rentals_1.getRental);
exports.rentalRoutes.route("/rentals/:rentalId/update").post(index_1.requireAuth, rentals_1.updateRental);
exports.rentalRoutes.route("/rentals/:rentalId/delete").post(index_1.requireAuth, rentals_1.deleteRental);
