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
    likeArticle,
    dislikeArticle,
    deleteArticle,
    searchArticles
} = articleController;


articleRouter.get("/viewAll/", verifyToken, viewAllArticle);
articleRouter.get("/view/:articleId", verifyToken, monoArticleView);
articleRouter.get("/viewMy/:articleType", verifyToken, viewMyArticles);

articleRouter.post("/create", verifyToken, crateArticle);
articleRouter.post("/search", verifyToken, searchArticles);
articleRouter.put("/edit", verifyToken, editArticle);
articleRouter.put("/publish/:articleId", verifyToken, publishArticle);
articleRouter.put("/archive/:articleId", verifyToken, archiveArticle);
articleRouter.put("/like/:articleId", verifyToken, likeArticle);
articleRouter.put("/dislike/:articleId", verifyToken, dislikeArticle);

articleRouter.delete("/delete", verifyToken, deleteArticle);

export default articleRouter;
