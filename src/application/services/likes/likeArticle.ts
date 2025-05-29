import { User } from "../../../domain/entities/User";
import { ArticleInterface } from "../../../domain/interfaces/Repositories/articleRepository";

 
export class LikeArticle {
    constructor(private articleInterface: ArticleInterface) { }

    async execute(articleId: string): Promise<User> {
        return this.articleInterface.likeArticle(articleId);
    }
}
