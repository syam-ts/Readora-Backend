"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enums_1 = require("../../helper/contants/enums");
const statusMessages_1 = require("../../helper/contants/statusMessages");
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(enums_1.HttpStatusCode.UNAUTHORIZED).json({
            message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.UNAUTHORIZED],
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = { id: decoded._id, name: decoded.name };
        return next();
    }
    catch (error) {
        res.status(enums_1.HttpStatusCode.UNAUTHORIZED).json({
            message: error,
        });
        return;
    }
};
exports.verifyToken = verifyToken;
