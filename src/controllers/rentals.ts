import { NextFunction, Request, Response } from "express";
import { models } from "../models/index";
import { uploadImageToCloudinary } from "../services/cloudinary";
import { formatFileData } from "../services/datauri";
import { catchAsync } from "../utils/index";

export const getRentals = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { city } = req.query as any;
    const query = city ? { city: city.toLowerCase() } : {};
    const rentals = await models.Rental.find(query).populate("image");

    return res.status(200).json({
      success: true,
      rentals,
    });
  }
);

export const getRentalsByMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = req.user.id;
    const rentals = await models.Rental.find({ owner: userId }).populate(
      "image"
    );

    return res.status(200).json({
      success: true,
      rentals,
    });
  }
);

export const getRental = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rentalId: string = req.params.rentalId;
    const rental = await models.Rental.findById(rentalId).populate("image");

    if (!rental) {
      const error: any = new Error("Rental not found!");
      error.status = 404;
      return next(error);
    }

    return res.status(200).json({
      success: true,
      rental,
    });
  }
);

export const createRental = catchAsync(async (req: Request, res: Response) => {
  const rentalArgs = req.body;
  // @ts-ignore
  const user = req.user.id;
  const newRental = { ...rentalArgs, owner: user };

  const createdRental = await (await models.Rental.create(newRental))
    .populate("owner")
    .populate("image");

  return res.status(201).json({
    success: true,
    rental: createdRental,
  });
});

export const updateRental = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const rentalArgs = req.body;
    const rentalId: string = req.params.rentalId;
    // @ts-ignore
    const userId = req.user.id;
    const rental = await models.Rental.findById(rentalId);

    if (!rental) return next(new Error("Rental not found"));
    if (rental && rental.owner && String(userId) !== String(rental.owner))
      return next(
        new Error("You do not have permission to perform this action")
      );

    rental.set(rentalArgs);
    await rental.save();

    return res.status(200).json({
      success: true,
      rental,
    });
  }
);

export const deleteRental = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = req.user.id;
    const rentalId: string = req.params.rentalId;
    const rental = await models.Rental.findById(rentalId);
    const bookings = await models.Booking.find({ rental: rental?.id });
    if (
      userId &&
      rental &&
      rental.owner &&
      String(userId) !== String(rental.owner)
    )
      return next(
        new Error("You do not have permission to perform this action!")
      );
    if (bookings && bookings.length > 0)
      return next(
        new Error("You cannot delete this rental as it has a booking on it!")
      );

    await rental?.remove();
    return res.status(200).json({
      success: true,
      rental,
    });
  }
);

export const uploadRentalImage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const file64 = formatFileData(req.file);
    const result = await uploadImageToCloudinary(file64.content);
    const createdFile = await models.File.create({
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });

    return res.status(200).json({
      success: true,
      file: createdFile,
    });
  }
);
