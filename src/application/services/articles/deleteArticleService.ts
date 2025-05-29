import { Article } from "../../../domain/entities/Article";
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";

 
export class DeleteArticle {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(articleId: string): Promise<Article> {
        return this.articleInterface.deleteArticle(articleId);
    }
}
