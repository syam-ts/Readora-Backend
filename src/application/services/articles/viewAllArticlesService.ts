import { Article } from "../../../domain/entities/Article"; 
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";
 

export class ViewAllArtcles {
    constructor(private articleInterface: ArticleInterface) {}

    async execute(userId: string, loadMoreIndex: number): Promise<Article> {
         const result = this.articleInterface.viewAllArticles(userId, loadMoreIndex);

         return result;
    }
}