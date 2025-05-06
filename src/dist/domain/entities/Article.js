"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = exports.ArticleSchema = void 0;
const mongoose_1 = require("mongoose");
//use tags for search
exports.ArticleSchema = new mongoose_1.Schema({
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
exports.ArticleModel = (0, mongoose_1.model)("Article", exports.ArticleSchema);
