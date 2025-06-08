 import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";

export class CheckIfUserDislikedArticle {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(articleId: string, userId: string): Promise<boolean> {
        return this.articleInterface.hasUserDisikedArticle(articleId, userId);
    }
}
