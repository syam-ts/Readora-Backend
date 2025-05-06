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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userSignupService_1 = require("../../../application/services/users/userSignupService");
const userLoginService_1 = require("../../../application/services/users/userLoginService");
const articleCreationService_1 = require("../../../application/services/articles/articleCreationService");
const viewAllArticlesService_1 = require("../../../application/services/articles/viewAllArticlesService");
const monoArticleViewService_1 = require("../../../application/services/articles/monoArticleViewService");
const viewUserProfileService_1 = require("../../../application/services/users/viewUserProfileService");
const viewMyArticlesService_1 = require("../../../application/services/articles/viewMyArticlesService");
const addPreferencesService_1 = require("../../../application/services/users/addPreferencesService");
const editProfileService_1 = require("../../../application/services/users/editProfileService");
const editArticleService_1 = require("../../../application/services/articles/editArticleService");
const deleteArticleService_1 = require("../../../application/services/articles/deleteArticleService");
const likeArticle_1 = require("../../../application/services/likes/likeArticle");
const dislikeArticle_1 = require("../../../application/services/likes/dislikeArticle");
const userRepository_1 = require("../../../domain/interfaces/Repositories/userRepository");
const enums_1 = require("../../../helper/contants/enums");
const statusMessages_1 = require("../../../helper/contants/statusMessages");
const generateToken_1 = __importDefault(require("../../../utils/jwt/generateToken"));
const userSignupService = new userSignupService_1.UserSignup(new userRepository_1.UserRepositoryMongoose());
const userLoginService = new userLoginService_1.UserLogin(new userRepository_1.UserRepositoryMongoose());
const createArticleService = new articleCreationService_1.CreateArticle(new userRepository_1.UserRepositoryMongoose());
const viewAllArtclesService = new viewAllArticlesService_1.ViewAllArtcles(new userRepository_1.UserRepositoryMongoose());
const monoArticleViewService = new monoArticleViewService_1.MonoArticleView(new userRepository_1.UserRepositoryMongoose());
const viewUserProfileService = new viewUserProfileService_1.ViewUserProfile(new userRepository_1.UserRepositoryMongoose());
const ViewMyArtclesService = new viewMyArticlesService_1.ViewMyArtcles(new userRepository_1.UserRepositoryMongoose());
const addPreferencesService = new addPreferencesService_1.AddPreferences(new userRepository_1.UserRepositoryMongoose());
const editProfileService = new editProfileService_1.EditProfile(new userRepository_1.UserRepositoryMongoose());
const editArticleService = new editArticleService_1.EditArticle(new userRepository_1.UserRepositoryMongoose());
const deleteArticleService = new deleteArticleService_1.DeleteArticle(new userRepository_1.UserRepositoryMongoose());
const likeArticleService = new likeArticle_1.LikeArticle(new userRepository_1.UserRepositoryMongoose());
const dislikeArticleService = new dislikeArticle_1.DislikeArticle(new userRepository_1.UserRepositoryMongoose());
class UserController {
    constructor() { }
    signupUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('bo', req.body);
                const result = yield userSignupService.execute(req.body);
                res
                    .status(enums_1.HttpStatusCode.OK)
                    .json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    user: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userLoginService.execute(req.body);
                const { accessToken, refreshToken } = (0, generateToken_1.default)(user);
                console.log('Refresh', refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                res
                    .status(enums_1.HttpStatusCode.OK)
                    .json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    user,
                    accessToken,
                    refreshToken,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    crateArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const result = yield createArticleService.execute(userId, req.body);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    article: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    viewAllArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const result = yield viewAllArtclesService.execute(userId);
                res
                    .status(enums_1.HttpStatusCode.CREATED)
                    .json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    articles: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    monoArticleView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { articleId } = req.params;
                const result = yield monoArticleViewService.execute(articleId);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    article: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    viewUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const result = yield viewUserProfileService.execute(userId);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    user: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    editProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('begingin: ', req.body);
                const result = yield editProfileService.execute(req.body);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    user: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    viewMyArticles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const result = yield ViewMyArtclesService.execute(userId);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    articles: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    editArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield editArticleService.execute(req.body);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    article: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    deleteArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { articleId } = req.body;
                const result = yield deleteArticleService.execute(articleId);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    article: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    likeArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { articleId } = req.params;
                const result = yield likeArticleService.execute(articleId);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    article: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    dislikeArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { articleId } = req.params;
                const result = yield dislikeArticleService.execute(articleId);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    article: result,
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
    addPreferences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const { preferences } = req.body;
                const result = yield addPreferencesService.execute(userId, preferences);
                res.status(enums_1.HttpStatusCode.CREATED).json({
                    message: statusMessages_1.StatusMessage[enums_1.HttpStatusCode.OK],
                    success: true,
                });
            }
            catch (error) {
                const err = error;
                res.status(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                    message: err.message,
                    success: false,
                });
                return;
            }
        });
    }
}
exports.UserController = UserController;
