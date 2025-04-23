import { Request, Response } from "express";
import { UserSignup } from "../../../application/services/userSignupService";
import { UserLogin } from "../../../application/services/userLoginService";
import { CreateArticle } from "../../../application/services/articleCreationService";
import { ViewAllArtcles } from "../../../application/services/viewAllArticlesService";
import { MonoArticleView } from "../../../application/services/monoArticleViewService";
import { ViewUserProfile } from "../../../application/services/viewUserProfileService";
import { EditProfile } from "../../../application/services/editProfileService";
import { EditArticle } from "../../../application/services/editArticleService";
import { DeleteArticle } from "../../../application/services/deleteArticleService";
import { UserRepositoryMongoose } from "../../../domain/interfaces/Repositories/userRepository";
import { HttpStatusCode } from "../../../helper/contants/enums";
import { StatusMessage } from "../../../helper/contants/statusMessages";

const userSignupService = new UserSignup(new UserRepositoryMongoose());
const userLoginService = new UserLogin(new UserRepositoryMongoose());
const createArticleService = new CreateArticle(new UserRepositoryMongoose());
const viewAllArtclesService = new ViewAllArtcles(new UserRepositoryMongoose());
const monoArticleViewService = new MonoArticleView(new UserRepositoryMongoose());
const viewUserProfileService = new ViewUserProfile(new UserRepositoryMongoose());
const editProfileService = new EditProfile(new UserRepositoryMongoose());
const editArticleService = new EditArticle(new UserRepositoryMongoose());
const deleteArticleService = new DeleteArticle(new UserRepositoryMongoose());

export class UserController {
    constructor() { }

    async signupUser(req: any, res: Response): Promise<any> {
        try {
            const { name, email, password } = req.body;
            console.log('body: ', req.body)

            const result = await userSignupService.execute(name, email, password);
            res.status(HttpStatusCode.OK).json({ message: StatusMessage[HttpStatusCode.OK], user: result, success: true });
        } catch (err: unknown) {
            console.log("ERROR: ", err);
        }
    }

    async loginUser(req: any, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            const result = await userLoginService.execute(email, password);

            res.status(HttpStatusCode.OK).json({ message: StatusMessage[HttpStatusCode.OK], user: result, success: true });
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

            const result = await createArticleService.execute(
                userId,
               req.body
            );


            res.status(HttpStatusCode.CREATED).json({ 
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                 success: true
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

            const userId = 'dummy userId'
            console.log('the params ', req.params.type)
            const { type } = req.params;

            const result = await viewAllArtclesService.execute(userId, type);

            res.status(HttpStatusCode.CREATED).json({ message: StatusMessage[HttpStatusCode.OK], articles: result, success: true });
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

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                success: true
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
                success: true
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

            const {
                userId,
                name,
                profilePicture,
                phone,
                dob,
                preferences
            } = req.body.body;
            const result = await editProfileService.execute(
                userId,
                name,
                profilePicture,
                phone,
                dob,
                preferences
            );

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                user: result,
                success: true
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
  
            const result = await editArticleService.execute(
               req.body
            );

            res.status(HttpStatusCode.CREATED).json({
                message: StatusMessage[HttpStatusCode.OK],
                article: result,
                success: true
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
                success: true
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
