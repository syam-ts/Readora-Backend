import mongoose, { Document, Schema, model } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    phone: number;
    gender: string;
    dob: number;
    location: string;
    preferences: string[];
    noOfArticles: number;
}

export const UserSchema: Schema = new Schema({
    name: { type: String, requied: true },
    email: { type: String, requied: true },
    password: { type: String, requied: true },
    profilePicture: { type: String, requied: true },
    phone: { type: Number, requied: true },
    gender: {
        type: String, requied: true,
        enum: ["male", "female", "not added yet"]
    },
    dob: { type: Number, requied: true },
    location: { type: String, requied: true },
    preferences: [{ type: String, requied: true }],
    noOfArticles: { type: Number, requied: false },
});

export const UserModel = model("User", UserSchema);
