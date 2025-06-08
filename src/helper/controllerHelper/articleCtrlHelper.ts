
import { CreateArticle } from "../../application/services/articles/articleCreationService";
import { ViewAllArtcles } from "../../application/services/articles/viewAllArticlesService";
import { MonoArticleView } from "../../application/services/articles/monoArticleViewService";
import { PublishArticle } from "../../application/services/articles/publishArticleService";
import { ArchiveArticle } from "../../application/services/articles/archiveArticleService";
import { ViewMyArtcles } from "../../application/services/articles/viewMyArticlesService";
import { EditArticle } from "../../application/services/articles/editArticleService";
import { DeleteArticle } from "../../application/services/articles/deleteArticleService";
import { CheckIfUserLikedArticle } from "../../application/services/likes/CheckIfUserLikedArticleService";
import { CheckIfUserDislikedArticle } from "../../application/services/likes/CheckIfUserDislikedArticleService";
import { LikeArticle } from "../../application/services/likes/likeArticleService";
import { DislikeArticle } from "../../application/services/likes/dislikeArticleService";
import { SearchArticles } from "../../application/services/articles/searchArticlesService";
import { ArticleRepositoryMongoose } from "../../infrastructure/Repository-DB/articleRepository";

const createArticleService = new CreateArticle(new ArticleRepositoryMongoose());
const viewAllArtclesService = new ViewAllArtcles(new ArticleRepositoryMongoose());
const monoArticleViewService = new MonoArticleView(new ArticleRepositoryMongoose());
const publishArticleService = new PublishArticle(new ArticleRepositoryMongoose());
const archiveArticleService = new ArchiveArticle(new ArticleRepositoryMongoose());
const ViewMyArtclesService = new ViewMyArtcles(new ArticleRepositoryMongoose());
const editArticleService = new EditArticle(new ArticleRepositoryMongoose());
const deleteArticleService = new DeleteArticle(new ArticleRepositoryMongoose());
const checkIfUserLikedArticleService = new CheckIfUserLikedArticle(new ArticleRepositoryMongoose());
const checkIfUserDislikedArticleService = new CheckIfUserDislikedArticle(new ArticleRepositoryMongoose());
const likeArticleService = new LikeArticle(new ArticleRepositoryMongoose());
const dislikeArticleService = new DislikeArticle(new ArticleRepositoryMongoose());
const searchArticlesService = new SearchArticles(new ArticleRepositoryMongoose());

export const articleController = {
    createArticleService,
    viewAllArtclesService,
    monoArticleViewService,
    publishArticleService,
    archiveArticleService,
    ViewMyArtclesService,
    editArticleService,
    deleteArticleService,
    checkIfUserLikedArticleService,
    checkIfUserDislikedArticleService,
    likeArticleService,
    dislikeArticleService,
    searchArticlesService,
};

