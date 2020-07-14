import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index";
import { models } from "../models/index";
import { catchAsync } from "../utils/index";

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    // Validation
    const errors: { [key: string]: { path: string; message: string } } = {};
    if (!email)
      errors.email = {
        path: "email",
        message: "Email is required!",
      };
    if (!password)
      errors.password = {
        path: "password",
        message: "Password is required!",
      };

    const existingUser = await models.User.findOne({ email });
    if (email && !existingUser)
      errors.email = {
        path: "email",
        message: "Wrong credentials!",
      };
    const isPwdValid =
      existingUser && (await bcrypt.compare(password, existingUser.password));

    if (password && !isPwdValid)
      errors.email = {
        path: "password",
        message: "Wrong credentials!",
      };

    if (Object.values(errors).length) {
      const error: any = new Error("Error: ");
      error.type = "InputError";
      error.errors = Object.values(errors);
      return next(error);
    }

    // Actions
    const token = jwt.sign(
      { uid: existingUser?.id || "" },
      config.jwt.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      success: true,
      token,
    });
  }
);

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password, passwordConfirmation } = req.body;
    // Validation
    const errors: { [key: string]: { path: string; message: string } } = {};
    if (!username)
      errors.username = {
        path: "username",
        message: "Username is required!",
      };
    if (!email)
      errors.email = {
        path: "email",
        message: "Email is required!",
      };
    if (!password)
      errors.password = {
        path: "password",
        message: "Password is required!",
      };
    if (!passwordConfirmation)
      errors.passwordConfirmation = {
        path: "passwordConfirmation",
        message: "Retype your password!",
      };
    if (password && passwordConfirmation && password !== passwordConfirmation)
      errors.passwordConfirmation = {
        path: "passwordConfirmation",
        message: "Password doesn't match with above information!",
      };

    const existingUser = await models.User.findOne({ email });
    if (email && existingUser)
      errors.email = {
        path: "email",
        message: "Email address has taken!",
      };

    if (Object.values(errors).length) {
      const error: any = new Error("Error: ");
      error.type = "InputError";
      error.errors = Object.values(errors);
      return next(error);
    }

    // Actions
    const newUser = {
      username,
      email,
      password: await bcrypt.hash(password, 12),
    };
    const createdUser = await models.User.create(newUser);

    return res.status(201).json({
      success: true,
      userId: createdUser.id,
    });
  }
);
