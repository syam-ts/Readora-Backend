import { Article } from "../../entities/Article";

export interface ArticleInterface {

    createArticle(article: any): Promise<Article>;
    viewAllArticles(userId: string): Promise<Article>;
    viewMyArticles(userId: string, articleType: string): Promise<Article>;
    publishArticle(articleId: string): Promise<any>;
    archiveArticle(articleId: string): Promise<Article>;
    monoArticleView(articleId: string): Promise<Article>;
    editArticle(article: any): Promise<any>;
    deleteArticle(articleId: string): Promise<any>;
    likeArticle(articleId: string): Promise<any>;
    dislikeArticle(articleId: string): Promise<any>;
}
