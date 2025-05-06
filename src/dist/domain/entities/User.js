"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, requied: true },
    email: { type: String, requied: true },
    password: { type: String, requied: true },
    profilePicture: { type: String, requied: true },
    phone: { type: Number, requied: true },
    gender: {
        type: String, requied: true,
        enum: ["male", "female", "not added yet"]
    },
    dob: { type: Date, requied: true },
    location: { type: String, requied: true },
    preferences: [{ type: String, requied: true }],
    noOfArticles: { type: Number, requied: false },
});
exports.UserModel = (0, mongoose_1.model)("User", exports.UserSchema);
