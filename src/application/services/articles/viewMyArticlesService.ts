import { Article } from "../../../domain/entities/Article"; 
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";

 

export class ViewMyArtcles {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(userId: string, articleType: string): Promise<Article> {
        return this.articleInterface.viewMyArticles(userId, articleType);

    }
}
