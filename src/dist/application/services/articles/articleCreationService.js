"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticle = void 0;
const errorArticle_1 = require("../../../utils/ErrorHandling/errorArticle");
class CreateArticle {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(userId, article) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, subtitle, description, image, tags, category } = article;
            const finalArticle = {
                userId,
                title,
                subtitle,
                description,
                image,
                tags,
                category,
            };
            //validation using custom funciton  ------------->
            (0, errorArticle_1.articleError)(finalArticle, "create");
            return this.userRepository.createArticle(finalArticle);
        });
    }
}
exports.CreateArticle = CreateArticle;
