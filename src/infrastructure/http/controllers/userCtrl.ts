import { Request, Response } from "express";
import { UserSignup } from "../../../application/services/users/userSignupService";
import { UserLogin } from "../../../application/services/users/userLoginService";
import { VerifyOtp } from "../../../application/services/users/userVerifyOtpService";
import { CreateArticle } from "../../../application/services/articles/articleCreationService";
import { ViewAllArtcles } from "../../../application/services/articles/viewAllArticlesService";
import { MonoArticleView } from "../../../application/services/articles/monoArticleViewService";
import { PublishArticle } from "../../../application/services/articles/publishArticleService";
import { ArchiveArticle } from "../../../application/services/articles/archiveArticleService";
import { ViewUserProfile } from "../../../application/services/users/viewUserProfileService";
import { ViewMyArtcles } from "../../../application/services/articles/viewMyArticlesService";
import { AddPreferences } from "../../../application/services/users/addPreferencesService";
import { EditProfile } from "../../../application/services/users/editProfileService";
import { EditArticle } from "../../../application/services/articles/editArticleService";
import { DeleteArticle } from "../../../application/services/articles/deleteArticleService";
import { LikeArticle } from "../../../application/services/likes/likeArticle";
import { DislikeArticle } from "../../../application/services/likes/dislikeArticle";
import { UserRepositoryMongoose } from "../../../infrastructure/Repository-DB/userRepositoryMongo";
import { ArticleRepositoryMongoose } from "../../../infrastructure/Repository-DB/articleRepository";
import { HttpStatusCode } from "../../../helper/contants/enums";
import { StatusMessage } from "../../../helper/contants/statusMessages";
import generateToken from "../../../utils/jwt/generateToken";

const userSignupService = new UserSignup();
const userLoginService = new UserLogin(new UserRepositoryMongoose());
const verifyOtpService = new VerifyOtp(new UserRepositoryMongoose());
const addPreferencesService = new AddPreferences(new UserRepositoryMongoose());
const editProfileService = new EditProfile(new UserRepositoryMongoose());
const createArticleService = new CreateArticle(new ArticleRepositoryMongoose());
const viewAllArtclesService = new ViewAllArtcles(new ArticleRepositoryMongoose());
const monoArticleViewService = new MonoArticleView(
    new ArticleRepositoryMongoose()
);
const publishArticleService = new PublishArticle(new ArticleRepositoryMongoose());
const archiveArticleService = new ArchiveArticle(new ArticleRepositoryMongoose());
const viewUserProfileService = new ViewUserProfile(
    new UserRepositoryMongoose()
);
const ViewMyArtclesService = new ViewMyArtcles(new ArticleRepositoryMongoose());
const editArticleService = new EditArticle(new ArticleRepositoryMongoose());
const deleteArticleService = new DeleteArticle(new ArticleRepositoryMongoose());
const likeArticleService = new LikeArticle(new ArticleRepositoryMongoose());
const dislikeArticleService = new DislikeArticle(new ArticleRepositoryMongoose());

export class UserController {
    constructor() { }

    async signupUser(req: any, res: Response): Promise<void> {
        try { 
            const generatedOtp = await userSignupService.execute(req.body); 
            const data = {
                body: req.body,
                generatedOtp: generatedOtp
            } 

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                user: data,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async loginUser(req: any, res: Response): Promise<void> {
        try {
            const user = await userLoginService.execute(req.body);
            const { accessToken, refreshToken } = generateToken(user);
            console.log("Refresh", refreshToken);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                user,
                accessToken,
                refreshToken,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async verifyOtp(req: any, res: Response): Promise<void> {
        try {
            const user = await verifyOtpService.execute(req.body);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                user,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async crateArticle(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            const result = await createArticleService.execute(userId, req.body);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async viewAllArticle(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            const result = await viewAllArtclesService.execute(userId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                articles: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async monoArticleView(req: any, res: Response): Promise<void> {
        try {
            const { articleId } = req.params;
            const result = await monoArticleViewService.execute(articleId);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async publishArticle(req: any, res: Response): Promise<void> {
        try {
            const { articleId } = req.params;
            const result = await publishArticleService.execute(articleId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.CREATED],
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async archiveArticle(req: any, res: Response): Promise<void> {
        try {
            const { articleId } = req.params;
            const result = await archiveArticleService.execute(articleId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.CREATED],
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async viewUserProfile(req: any, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const result = await viewUserProfileService.execute(userId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                user: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async editProfile(req: any, res: Response): Promise<void> {
        try {
            console.log("begingin: ", req.body);
            const result = await editProfileService.execute(req.body);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                user: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async viewMyArticles(req: any, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const { articleType } = req.params;

            const userId: string = req.user.id;

            const result = await ViewMyArtclesService.execute(userId, articleType);

            res.status(HttpStatusCode.OK).json({
                message: StatusMessage[HttpStatusCode.OK],
                articles: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async editArticle(req: any, res: Response): Promise<void> {
        try {
            const result = await editArticleService.execute(req.body);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async deleteArticle(req: Request, res: Response): Promise<void> {
        try {
            const { articleId } = req.body;

            const result = await deleteArticleService.execute(articleId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async likeArticle(req: Request, res: Response): Promise<void> {
        try {
            const { articleId } = req.params;

            const result = await likeArticleService.execute(articleId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async dislikeArticle(req: Request, res: Response): Promise<void> {
        try {
            const { articleId } = req.params;

            const result = await dislikeArticleService.execute(articleId);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }

    async addPreferences(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const { preferences } = req.body;

            const result = await addPreferencesService.execute(userId, preferences);

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                success: true,
            });
        } catch (error: unknown) {
            const err = error as { message: string };
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: err.message,
                success: false,
            });
            return;
        }
    }
}
