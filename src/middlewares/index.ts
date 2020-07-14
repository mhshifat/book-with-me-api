import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index";
import { models } from "../models/index";
import { uploadImage } from "../services/multer";
import { catchAsync } from "../utils/index";

export const requireAuth = catchAsync(
  async (req: any, res: Response, next: NextFunction) => {
    const sendAuthenticationError = () => {
      const error: any = new Error("AuthenticationError: ");
      error.type = "AuthenticationError";
      error.errors = [
        {
          path: "authorization",
          message: "You are not authorized to perform this action!",
        },
      ];
      return next(error);
    };

    const token: string | null = req.headers.authorization || null;

    if (!token) return sendAuthenticationError();
    const isTokenValid: any =
      token && jwt.verify(token.split(" ")[1], config.jwt.JWT_SECRET);
    if (!isTokenValid) return sendAuthenticationError();
    const existingUser =
      isTokenValid && (await models.User.findById(isTokenValid.uid));
    if (!existingUser) return sendAuthenticationError();
    req.user = existingUser;
    return next();
  }
);

export const singleUploadCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const singleUpload = uploadImage.single("image");
  singleUpload(req, res, (err: any) => {
    if (err) {
      err.errors = [
        {
          path: "Upload",
          message: err.message,
        },
      ];
      next(err);
    }
    next();
  });
};
