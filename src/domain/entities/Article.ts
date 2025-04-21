import mongoose, { Document, Schema, model } from "mongoose";

export interface Article extends Document {
    userId: string;
    title: string;
    subtitle: string
    description: string;
    image: string;
    tags: string[];
    category: string;
    createdAt: Date
}

//use tags for search
export const ArticleSchema: Schema = new Schema({
    userId: { type: String, requied: true },
    title: { type: String, requied: true },
    subtitle: { type: String, requied: true },
    description: { type: String, requied: true },
    image: { type: String, requied: true },
    tags: [{ type: String, requied: true }],
    category: { type: String, requied: true },
    createdAt: { type: Date, requied: true },
});

export const ArticleModel = model("Article", ArticleSchema);
