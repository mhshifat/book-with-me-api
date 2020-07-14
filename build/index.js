"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var index_1 = require("./config/index");
var index_2 = require("./db/index");
var index_3 = require("./fakeDB/index");
var bookings_1 = require("./routes/v1/bookings");
var rentals_1 = require("./routes/v1/rentals");
var users_1 = require("./routes/v1/users");
var appConfig = index_1.config.app, db = index_1.config.db;
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/api/v1", users_1.usersRoutes);
app.use("/api/v1", rentals_1.rentalRoutes);
app.use("/api/v1", bookings_1.bookingRoutes);
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({
        success: false,
        error: __assign({ type: err.type || "InternalError", errors: err.errors || [
                {
                    path: "internal",
                    message: "Something went wrong, please try again later!",
                },
            ] }, (!appConfig.IN_PROD ? { stack: err.stack } : {})),
    });
});
index_2.CBD(db.MONGODB_URI)
    .then(function () {
    console.log("[ BookWithMe ] A database connection has been established!");
    if (!appConfig.IN_PROD)
        new index_3.FakeDB().init();
    return app.listen(appConfig.PORT);
})
    .then(function () {
    console.log("[ BookWithMe ] The server is running on http://localhost:" + appConfig.PORT + "!");
})
    .catch(function () { return process.exit(); });
