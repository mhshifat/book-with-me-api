import express from "express";
import { login, register } from "../../controllers/users";

export const usersRoutes = express.Router();

usersRoutes.route("/login").post(login);
usersRoutes.route("/register").post(register);
