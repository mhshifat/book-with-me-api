import { Document, model, Schema } from "mongoose";
import { IRentalDocument } from "../Rental/index";
import { IUserDocument } from "../User/index";

export interface IBookingDocument {
  id: string;
  startAt: string;
  endAt: string;
  user: IUserDocument["id"];
  rental: IRentalDocument["id"];
  price: number;
  nights: number;
  guests: number;
  createdAt: string;
}

const bookingSchema: Schema = new Schema(
  {
    startAt: { type: Date, required: "Starting date is required" },
    endAt: { type: Date, required: "Ending date is required" },
    price: { type: Number, required: true },
    nights: { type: Number, required: true },
    guests: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rental: { type: Schema.Types.ObjectId, ref: "Rental", required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

type BookingModelType = IBookingDocument & Document;

export const BookingModel = model<BookingModelType>("Booking", bookingSchema);
