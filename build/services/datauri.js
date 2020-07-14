"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatFileData = void 0;
var parser_1 = __importDefault(require("datauri/parser"));
var path_1 = require("path");
var parser = new parser_1.default();
exports.formatFileData = function (file) {
    return parser.format(path_1.extname(file.originalname).toString(), file.buffer);
};
