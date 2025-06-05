import { Request, Response } from "express";
import { HttpStatusCode } from "../../../helper/contants/enums";
import { StatusMessage } from "../../../helper/contants/statusMessages";
import { CreateArticle } from "../../../application/services/articles/articleCreationService";
import { ViewAllArtcles } from "../../../application/services/articles/viewAllArticlesService";
import { MonoArticleView } from "../../../application/services/articles/monoArticleViewService";
import { PublishArticle } from "../../../application/services/articles/publishArticleService";
import { ArchiveArticle } from "../../../application/services/articles/archiveArticleService";
import { ViewMyArtcles } from "../../../application/services/articles/viewMyArticlesService";
import { EditArticle } from "../../../application/services/articles/editArticleService";
import { DeleteArticle } from "../../../application/services/articles/deleteArticleService";
import { LikeArticle } from "../../../application/services/likes/likeArticle";
import { DislikeArticle } from "../../../application/services/likes/dislikeArticle";
import { SearchArticles } from "../../../application/services/articles/searchArticlesService";
import { ArticleRepositoryMongoose } from "../../../infrastructure/Repository-DB/articleRepository";

const createArticleService = new CreateArticle(new ArticleRepositoryMongoose());
const viewAllArtclesService = new ViewAllArtcles(new ArticleRepositoryMongoose());
const monoArticleViewService = new MonoArticleView(new ArticleRepositoryMongoose());
const publishArticleService = new PublishArticle(new ArticleRepositoryMongoose());
const archiveArticleService = new ArchiveArticle(new ArticleRepositoryMongoose());
const ViewMyArtclesService = new ViewMyArtcles(new ArticleRepositoryMongoose());
const editArticleService = new EditArticle(new ArticleRepositoryMongoose());
const deleteArticleService = new DeleteArticle(new ArticleRepositoryMongoose());
const likeArticleService = new LikeArticle(new ArticleRepositoryMongoose());
const dislikeArticleService = new DislikeArticle(new ArticleRepositoryMongoose());
const searchArticlesService = new SearchArticles(new ArticleRepositoryMongoose());

export class ArticleController {
    constructor() { }

    async crateArticle(req: any, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String(req.user?.id);

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
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId = String(req.user?.id); 
            const { loadMoreIndex} = req.query; 

            const result = await viewAllArtclesService.execute(userId, loadMoreIndex);

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

    async viewMyArticles(req: any, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: "Unauthorized", success: false });
            }
            const userId: string = req.user.id;
            const { articleType } = req.params;

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

    async searchArticles(req: Request, res: Response): Promise<void> {
        try {
            const { input } = req.params;
            const result = await searchArticlesService.execute(input);

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
}
