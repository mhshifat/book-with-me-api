import { NextFunction, Request, Response } from "express";
import moment from "moment";
import { models } from "../models/index";
import { catchAsync } from "../utils/index";

export const getBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rentalId = req.params.rentalId;
    // @ts-ignore
    const bookings = await models.Booking.find({ rental: rentalId })
      .populate("user", "-password")
      .populate("rental");

    return res.status(200).json({
      success: true,
      bookings,
    });
  }
);

export const getBookingsByMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const bookings = await models.Booking.find({ user: req.user.id })
      .populate("user", "-password")
      .populate("rental");

    return res.status(200).json({
      success: true,
      bookings,
    });
  }
);

export const getBookingsByReceived = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = req.user.id;
    const rentals = await models.Rental.find({ owner: userId }).select("_id");
    const rentalIds = rentals.map((r) => r.id);
    const bookings = await models.Booking.find({ rental: { $in: rentalIds } })
      .populate("user", "-password")
      .populate("rental");

    return res.status(200).json({
      success: true,
      bookings,
    });
  }
);

export const createBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let isValid = true;
    const booingArgs = req.body;
    const newBooking = { ...booingArgs };
    //  Validation
    const errors: { [key: string]: { path: string; message: string } } = {};
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
      const error: any = new Error("Error: ");
      error.type = "InputError";
      error.errors = Object.values(errors);
      return next(error);
    }
    const existingRental = await models.Rental.findById(booingArgs.rentalId);
    if (!existingRental) return next(new Error());
    // @ts-ignore
    if (existingRental && existingRental.owner === req.user.id)
      return next(new Error());
    const allBookings = await models.Booking.find({
      rental: existingRental.id,
    });
    if (allBookings && allBookings.length > 0) {
      isValid = allBookings.every((item) => {
        const bookingStartDate = moment(item.startAt);
        const bookingEndDate = moment(item.endAt);
        const proposedStartDate = moment(booingArgs.startAt);
        const proposedEndDate = moment(booingArgs.endAt);

        return (
          (bookingStartDate < proposedStartDate &&
            bookingEndDate < proposedStartDate) ||
          (proposedEndDate < bookingEndDate &&
            proposedEndDate < bookingStartDate)
        );
      });
    }
    if (!isValid) return next(new Error());
    const createdBooking = await models.Booking.create({
      ...newBooking,
      // @ts-ignore
      user: req.user.id,
      rental: booingArgs.rentalId,
    });

    return res.status(201).json({
      success: true,
      booking: createdBooking,
    });
  }
);

export const deleteBooking = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = req.user.id;
    const bookingId = req.params.bookingId;
    const booking = await models.Booking.findById(bookingId);

    if (
      userId &&
      booking &&
      booking.user &&
      String(booking.user) !== String(userId)
    )
      return next(new Error());
    if (booking && moment(booking.startAt).diff(moment(), "days") < 3)
      return next(new Error());

    await booking?.remove();
    return res.status(200).json({
      success: true,
      booking: booking,
    });
  }
);
