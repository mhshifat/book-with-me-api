"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CBD = void 0;
var mongoose_1 = require("mongoose");
exports.CBD = function (uri) {
    return mongoose_1.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
};
