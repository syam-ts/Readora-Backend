import { Article } from "../../../domain/entities/Article";
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";


export class SearchArticles {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(input: string): Promise<Article[]> {
        
        return this.articleInterface.searchArticles(input);
    }
}
