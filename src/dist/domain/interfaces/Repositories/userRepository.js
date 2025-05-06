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
exports.UserRepositoryMongoose = void 0;
const User_1 = require("../../entities/User");
const Article_1 = require("../../entities/Article");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserRepositoryMongoose {
    createUser(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = credentials;
            const salt = parseInt(process.env.BCRYPT_SALT, 10);
            const hashedPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = new User_1.UserModel({
                name,
                email,
                password: hashedPassword,
                profilePicture: "",
                phone: null,
                gender: "not added yet",
                dob: null,
                location: "",
                preferences: [],
                noOfArticles: 0,
            });
            const savedUser = yield newUser.save();
            return { userId: savedUser._id };
        });
    }
    addPreferences(userId, preferences) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateUser = yield User_1.UserModel.findByIdAndUpdate(userId, { $set: { preferences } }, { new: true });
            if (!updateUser)
                throw new Error("User not found");
            return updateUser;
        });
    }
    loginUser(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = credentials;
            const user = yield User_1.UserModel.findOne({ email }).lean().exec();
            console.log("the use", user);
            if (!user)
                throw new Error("user not found");
            const userPassword = user.password;
            const isValidPassword = yield bcrypt_1.default.compare(password, userPassword);
            if (!isValidPassword) {
                throw new Error("wrong password");
            }
            if (user) {
                return {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePicture: user.profilePicture,
                    phone: user.phone,
                    dob: user.dob,
                    preferences: user.preferences,
                };
            }
        });
    }
    createArticle(article) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, title, subtitle, description, image, tags, category } = article;
            const user = yield User_1.UserModel.findById(userId).lean();
            if (!user)
                throw new Error("user not found");
            const newArticle = new Article_1.ArticleModel({
                userId,
                author: user.name,
                subtitle,
                title,
                description,
                image,
                tags,
                category,
                createdAt: new Date(),
            });
            const savedArticle = newArticle.save();
            return savedArticle;
        });
    }
    viewAllArticles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findById(userId);
            if (!user)
                throw new Error("User not found");
            const preferences = user.preferences;
            const articles = yield Article_1.ArticleModel.find({
                category: { $in: preferences },
            }).lean();
            if (!articles)
                throw new Error("no article found");
            return articles;
        });
    }
    viewMyArticles(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const myArticles = yield Article_1.ArticleModel.find({ userId: userId })
                .sort({ createdAt: -1 })
                .lean()
                .exec();
            if (!myArticles)
                throw new Error("no articles found");
            return myArticles;
        });
    }
    monoArticleView(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const article = yield Article_1.ArticleModel.findById(articleId);
            if (!article)
                throw new Error("No article found");
            return article;
        });
    }
    viewUserProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.UserModel.findById(userId);
            if (!user)
                throw new Error("user not found");
            return user;
        });
    }
    editProfile(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, name, profilePicture, phone, dob, gender, location, preferences, } = user;
            const editData = {
                name,
                profilePicture,
                phone: phone,
                dob: new Date(dob).getTime(),
                gender,
                location,
                preferences,
            };
            const editProfile = yield User_1.UserModel.findByIdAndUpdate(userId, Object.assign({}, editData), {
                new: true,
            });
            if (!editProfile)
                throw new Error("user not found");
            return editProfile;
        });
    }
    editArticle(article) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, title, subtitle, description, image, tags, category } = article;
            const editData = {
                title,
                subtitle,
                description,
                image,
                tags,
                category,
            };
            const editedArticle = yield Article_1.ArticleModel.findByIdAndUpdate(_id, Object.assign({}, editData), {
                new: true,
            });
            if (!editedArticle)
                throw new Error("Article not found");
            // console.log("The result of edit article: ", editedArticle);
            return editedArticle;
        });
    }
    deleteArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteArticle = yield Article_1.ArticleModel.findByIdAndDelete(articleId);
            if (!deleteArticle)
                throw new Error("Article not founded");
            return deleteArticle;
        });
    }
    likeArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const likeArticle = yield Article_1.ArticleModel.findByIdAndUpdate(articleId, {
                $inc: { likes: 1 },
            }, {
                new: true,
            });
            if (!likeArticle)
                throw new Error("Article not found");
            return likeArticle;
        });
    }
    dislikeArticle(articleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dislikeArticle = yield Article_1.ArticleModel.findByIdAndUpdate(articleId, {
                $inc: { dislikes: 1 },
            }, {
                new: true,
            });
            if (!dislikeArticle)
                throw new Error("Article not found");
            return dislikeArticle;
        });
    }
}
exports.UserRepositoryMongoose = UserRepositoryMongoose;
