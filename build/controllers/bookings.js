"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.createBooking = exports.getBookingsByReceived = exports.getBookingsByMe = exports.getBookings = void 0;
var moment_1 = __importDefault(require("moment"));
var index_1 = require("../models/index");
var index_2 = require("../utils/index");
exports.getBookings = index_2.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var rentalId, bookings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                rentalId = req.params.rentalId;
                return [4 /*yield*/, index_1.models.Booking.find({ rental: rentalId })
                        .populate("user", "-password")
                        .populate("rental")];
            case 1:
                bookings = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        bookings: bookings,
                    })];
        }
    });
}); });
exports.getBookingsByMe = index_2.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var bookings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, index_1.models.Booking.find({ user: req.user.id })
                    .populate("user", "-password")
                    .populate("rental")];
            case 1:
                bookings = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        bookings: bookings,
                    })];
        }
    });
}); });
exports.getBookingsByReceived = index_2.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, rentals, rentalIds, bookings;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                return [4 /*yield*/, index_1.models.Rental.find({ owner: userId }).select("_id")];
            case 1:
                rentals = _a.sent();
                rentalIds = rentals.map(function (r) { return r.id; });
                return [4 /*yield*/, index_1.models.Booking.find({ rental: { $in: rentalIds } })
                        .populate("user", "-password")
                        .populate("rental")];
            case 2:
                bookings = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        bookings: bookings,
                    })];
        }
    });
}); });
exports.createBooking = index_2.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var isValid, booingArgs, newBooking, errors, error, existingRental, allBookings, createdBooking;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                isValid = true;
                booingArgs = req.body;
                newBooking = __assign({}, booingArgs);
                errors = {};
                if (!booingArgs.startAt)
                    errors.startAt = {
                        path: "startAt",
                        message: "Start date is required!",
                    };
                if (!booingArgs.endAt)
                    errors.endAt = {
                        path: "endAt",
                        message: "End date is required!",
                    };
                if (!booingArgs.price)
                    errors.price = {
                        path: "price",
                        message: "Price is required!",
                    };
                if (!booingArgs.nights)
                    errors.nights = {
                        path: "nights",
                        message: "Nights is required!",
                    };
                if (!booingArgs.guests)
                    errors.guests = {
                        path: "guests",
                        message: "Guests is required!",
                    };
                if (Object.values(errors).length) {
                    error = new Error("Error: ");
                    error.type = "InputError";
                    error.errors = Object.values(errors);
                    return [2 /*return*/, next(error)];
                }
                return [4 /*yield*/, index_1.models.Rental.findById(booingArgs.rentalId)];
            case 1:
                existingRental = _a.sent();
                if (!existingRental)
                    return [2 /*return*/, next(new Error())];
                // @ts-ignore
                if (existingRental && existingRental.owner === req.user.id)
                    return [2 /*return*/, next(new Error())];
                return [4 /*yield*/, index_1.models.Booking.find({
                        rental: existingRental.id,
                    })];
            case 2:
                allBookings = _a.sent();
                if (allBookings && allBookings.length > 0) {
                    isValid = allBookings.every(function (item) {
                        var bookingStartDate = moment_1.default(item.startAt);
                        var bookingEndDate = moment_1.default(item.endAt);
                        var proposedStartDate = moment_1.default(booingArgs.startAt);
                        var proposedEndDate = moment_1.default(booingArgs.endAt);
                        return ((bookingStartDate < proposedStartDate &&
                            bookingEndDate < proposedStartDate) ||
                            (proposedEndDate < bookingEndDate &&
                                proposedEndDate < bookingStartDate));
                    });
                }
                if (!isValid)
                    return [2 /*return*/, next(new Error())];
                return [4 /*yield*/, index_1.models.Booking.create(__assign(__assign({}, newBooking), { 
                        // @ts-ignore
                        user: req.user.id, rental: booingArgs.rentalId }))];
            case 3:
                createdBooking = _a.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        booking: createdBooking,
                    })];
        }
    });
}); });
exports.deleteBooking = index_2.catchAsync(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, bookingId, booking;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.id;
                bookingId = req.params.bookingId;
                return [4 /*yield*/, index_1.models.Booking.findById(bookingId)];
            case 1:
                booking = _a.sent();
                if (userId &&
                    booking &&
                    booking.user &&
                    String(booking.user) !== String(userId))
                    return [2 /*return*/, next(new Error())];
                if (booking && moment_1.default(booking.startAt).diff(moment_1.default(), "days") < 3)
                    return [2 /*return*/, next(new Error())];
                return [4 /*yield*/, (booking === null || booking === void 0 ? void 0 : booking.remove())];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        success: true,
                        booking: booking,
                    })];
        }
    });
}); });
