import { Document, model, Schema } from "mongoose";
import { IUserDocument } from "../User/index";

export interface IRentalDocument {
  id: string;
  title: string;
  description: string;
  city: string;
  street: string;
  category: string;
  image: string;
  dailyPrice: number;
  numOfRooms: number;
  shared: boolean;
  owner: IUserDocument["id"];
  createdAt: string;
}

const rentalSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [128, "Invalid length! Maximum is 128 characters"],
    },
    city: { type: String, required: true, lowercase: true },
    street: {
      type: String,
      required: true,
      minlength: [4, "Invalid length! Minimum is 4 characters"],
    },
    category: { type: String, required: true, lowercase: true },
    image: { type: Schema.Types.ObjectId, ref: "File" },
    numOfRooms: { type: Number, required: true },
    description: { type: String, required: true },
    dailyPrice: { type: Number, required: true },
    shared: Boolean,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

type RentalModelType = IRentalDocument & Document;

export const RentalModel = model<RentalModelType>("Rental", rentalSchema);
