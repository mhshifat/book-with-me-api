import { Document, model, Schema } from "mongoose";

export interface IUserDocument {
  id: string;
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      minlength: [4, "Invalid length! Minimum is 4 characters"],
      maxlength: [32, "Invalid length! Maximum is 32 characters"],
    },
    email: {
      type: String,
      minlength: [4, "Invalid length! Minimum is 4 characters"],
      maxlength: [32, "Invalid length! Maximum is 32 characters"],
      unique: true,
      lowercase: true,
      required: "Email is required!",
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
    },
    password: {
      type: String,
      required: "Password is required!",
    },
  },
  {
    timestamps: true,
  }
);

type UserModelType = IUserDocument & Document;

export const UserModel = model<UserModelType>("User", userSchema);
