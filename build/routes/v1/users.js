"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
var express_1 = __importDefault(require("express"));
var users_1 = require("../../controllers/users");
exports.usersRoutes = express_1.default.Router();
exports.usersRoutes.route("/login").post(users_1.login);
exports.usersRoutes.route("/register").post(users_1.register);
