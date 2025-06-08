import { Article } from "../../entities/Article";

export interface ArticleInterface {

    createArticle(article: any): Promise<Article>;
    viewAllArticles(userId: string, loadMoreIndex: number): Promise<Article>;
    viewMyArticles(userId: string, articleType: string): Promise<Article>;
    publishArticle(articleId: string): Promise<any>;
    archiveArticle(articleId: string): Promise<Article>;
    monoArticleView(articleId: string): Promise<Article>;
    editArticle(article: any): Promise<any>;
    deleteArticle(articleId: string): Promise<any>;
    hasUserLikedArticle(articleId: string, userId: string): Promise<boolean>;
    hasUserDisikedArticle(articleId: string, userId: string): Promise<boolean>;
    likeArticle(articleId: string, userId: string): Promise<any>;
    dislikeArticle(articleId: string, userId: string): Promise<any>;
    searchArticles(input: string): Promise<Article[]>;
}
