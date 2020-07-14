import { BookingModel } from "./Booking/index";
import { FileModel } from "./file/index";
import { RentalModel } from "./Rental/index";
import { UserModel } from "./User/index";

export const models = {
  Rental: RentalModel,
  User: UserModel,
  Booking: BookingModel,
  File: FileModel,
};

export type ModelsType = typeof models;
