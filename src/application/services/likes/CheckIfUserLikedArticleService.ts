 import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";

export class CheckIfUserLikedArticle {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(articleId: string, userId: string): Promise<boolean> {
        return this.articleInterface.hasUserLikedArticle(articleId, userId);
    }
}
