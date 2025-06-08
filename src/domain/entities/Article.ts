import mongoose, { Document, Schema, model } from "mongoose";

export interface Article extends Document {
    userId: string;
    author: string;
    title: string;
    subtitle: string
    description: string;
    status: string;
    image: string;
    tags: string[];
    category: string;
    likes: {
        users: string[];
        total: number
    }
    dislikes: {
        users: string[];
         total: number
    }
    createdAt: Date
}

//use tags for search
export const ArticleSchema: Schema = new Schema({
    userId: { type: String, required: true },
    author: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['unpublished', 'published', 'archived'],
        required: true
    },
    image: { type: String, required: true },
    tags: [{ type: String, required: true }],
    category: { type: String, required: true },
    likes: {
        users: {
            type: [String], 
            default: []
        },
        total: {
            type: Number,
            default: 0
        }
    },
    dislikes: {
        users: {
            type: [String], 
            default: []
        },
         total: {
            type: Number,
            default: 0
        }
    },
    createdAt: { type: Date, required: true },
});

export const ArticleModel = model("Article", ArticleSchema);
