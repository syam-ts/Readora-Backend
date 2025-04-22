import mongoose, { Document, Schema, model } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    profilePicture: string;
    phone: number;
    dob: Date;
    preferences: string[];
}

export const UserSchema: Schema = new Schema({
    name: { type: String, requied: true },
    email: { type: String, requied: true },
    password: { type: String, requied: true },
    profilePicture: { type: String, requied: true },
    phone: { type: Number, requied: true },
    dob: { type: Date, requied: true },
    preferences: [{ type: String, requied: true }],
});


export const UserModel = model("User", UserSchema);