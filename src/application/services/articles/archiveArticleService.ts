import { Article } from "../../../domain/entities/Article";
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";
 

export class ArchiveArticle {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(articleId: string): Promise<Article> {
        return this.articleInterface.archiveArticle(articleId);
    }
}
