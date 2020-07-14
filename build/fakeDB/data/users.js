"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var bcryptjs_1 = require("bcryptjs");
exports.users = [
    {
        id: "1",
        username: "user1",
        email: "user1@example.com",
        password: bcryptjs_1.hashSync("user1"),
    },
    {
        id: "2",
        username: "user2",
        email: "user2@example.com",
        password: bcryptjs_1.hashSync("user2"),
    },
];
