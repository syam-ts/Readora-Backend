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
exports.EditArticle = void 0;
const errorArticle_1 = require("../../../utils/ErrorHandling/errorArticle");
class EditArticle {
    constructor(userRespository) {
        this.userRespository = userRespository;
    }
    execute(article) {
        return __awaiter(this, void 0, void 0, function* () {
            //validation using custom funciton  ------------->
            (0, errorArticle_1.articleError)(article, 'edit');
            return this.userRespository.editArticle(article);
        });
    }
}
exports.EditArticle = EditArticle;
