import mongoose, { Document, Schema, model } from "mongoose";

export interface Article extends Document {
    userId: string;
    author: string;
    title: string;
    subtitle: string
    description: string;
    image: string;
    tags: string[];
    category: string;
    likes: number
    distlikes: number
    createdAt: Date
}

//use tags for search
export const ArticleSchema: Schema = new Schema({
    userId: { type: String, requied: true },
    author: { type: String, requied: true },
    title: { type: String, requied: true },
    subtitle: { type: String, requied: true },
    description: { type: String, requied: true },
    image: { type: String, requied: true },
    tags: [{ type: String, requied: true }],
    category: { type: String, requied: true },
    likes: { type: Number, requied: false },
    dislikes: { type: Number, requied: false },
    createdAt: { type: Date, requied: true },
});

export const ArticleModel = model("Article", ArticleSchema);
