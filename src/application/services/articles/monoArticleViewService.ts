import { Article } from "../../../domain/entities/Article";
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";
 

export class MonoArticleView {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(articleId: string): Promise<Article> {
        return this.articleInterface.monoArticleView(articleId); 
 
    }
}
