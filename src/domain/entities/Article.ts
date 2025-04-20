import mongoose, { Document, Schema, model } from "mongoose";

export interface Article extends Document {
    title: string;
    description: string;
    image: string;
    tags: string[];
    categories: string[];
}

//use tags for search
export const ArticleSchema: Schema = new Schema({
    title: { type: String, requied: true },
    description: { type: String, requied: true },
    image: { type: String, requied: true },
    tags: [{ type: String, requied: true }],
    categories: [{ type: String, requied: true }],
});

export const ArticleModel = model("Article", ArticleSchema);
