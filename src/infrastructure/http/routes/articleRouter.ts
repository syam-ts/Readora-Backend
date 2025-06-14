import { Router } from "express";
import { ArticleController } from "../controllers/articleCtrl";
import { verifyToken } from "../../../utils/middleware/verifyToken";

const articleRouter = Router();
const articleController = new ArticleController();

const {
    crateArticle,
    monoArticleView,
    viewAllArticle,
    viewMyArticles,
    publishArticle,
    archiveArticle,
    editArticle,
    checkIfUserLiked,
    checkIfUserDisliked,
    likeArticle,
    dislikeArticle,
    deleteArticle,
    searchArticles
} = articleController;


articleRouter.get("/viewAll", verifyToken, viewAllArticle);
articleRouter.get("/view/:articleId", verifyToken, monoArticleView);
articleRouter.get("/viewMy/:articleType", verifyToken, viewMyArticles);
articleRouter.get("/like/:articleId", verifyToken, checkIfUserLiked)
articleRouter.get("/dislike/:articleId", verifyToken, checkIfUserDisliked)

articleRouter.post("/create", verifyToken, crateArticle);
articleRouter.post("/search/:input", verifyToken, searchArticles);
articleRouter.put("/edit", verifyToken, editArticle);
articleRouter.put("/publish/:articleId", verifyToken, publishArticle);
articleRouter.put("/archive/:articleId", verifyToken, archiveArticle);
articleRouter.put("/like/:articleId", verifyToken, likeArticle);
articleRouter.put("/dislike/:articleId", verifyToken, dislikeArticle);

articleRouter.delete("/delete", verifyToken, deleteArticle);

export default articleRouter;
